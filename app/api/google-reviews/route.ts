import { NextResponse } from "next/server"

interface GooglePlacesReview {
  author_name: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
}

export async function GET() {
  const apiKey =
    process.env.GOOGLE_PLACES_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  let placeId =
    process.env.GOOGLE_PLACE_ID ||
    process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID

  // If no API key is provided, return empty list with instruction
  if (!apiKey) {
    return NextResponse.json({
      success: false,
      error: "MISSING_API_KEY",
      message:
        "Please provide GOOGLE_PLACES_API_KEY in your .env file to fetch live reviews directly from Google Places API.",
      reviews: [],
    })
  }

  try {
    // If placeId is not specified, auto-discover placeId from business name and address
    if (!placeId) {
      const findUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Car%20Carrier%20Group%20Novato%20CA&inputtype=textquery&fields=place_id,name&key=${apiKey}`
      const findRes = await fetch(findUrl)
      if (findRes.ok) {
        const findData = await findRes.json()
        if (findData.candidates && findData.candidates.length > 0) {
          placeId = findData.candidates[0].place_id
        }
      }
    }

    if (!placeId) {
      return NextResponse.json({
        success: false,
        error: "PLACE_NOT_FOUND",
        message:
          "Could not locate Google Place ID for Car Carrier Group. Please specify GOOGLE_PLACE_ID in .env.",
        reviews: [],
      })
    }

    // Fetch live reviews directly from official Google Places API
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`
    const detailsRes = await fetch(detailsUrl, {
      next: { revalidate: 3600 }, // Cache on server for 1 hour for performance
    })

    if (!detailsRes.ok) {
      return NextResponse.json({
        success: false,
        error: "GOOGLE_API_ERROR",
        message: `Google Places API returned HTTP ${detailsRes.status}`,
        reviews: [],
      })
    }

    const data = await detailsRes.json()

    if (data.status === "OK" && data.result?.reviews) {
      const reviews = data.result.reviews.map(
        (rev: GooglePlacesReview, idx: number) => ({
          id: `google-review-${idx}`,
          authorName: rev.author_name,
          authorAvatar: rev.profile_photo_url,
          date: rev.relative_time_description,
          rating: rev.rating,
          reviewText: rev.text,
          verified: true,
        })
      )

      return NextResponse.json({
        success: true,
        source: "google_places_api",
        total: data.result.user_ratings_total || reviews.length,
        rating: data.result.rating || 5,
        reviews,
      })
    }

    return NextResponse.json({
      success: false,
      error: data.status,
      message: data.error_message || "No reviews returned from Google API.",
      reviews: [],
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      {
        success: false,
        error: "SERVER_FETCH_FAILED",
        message,
        reviews: [],
      },
      { status: 500 }
    )
  }
}
