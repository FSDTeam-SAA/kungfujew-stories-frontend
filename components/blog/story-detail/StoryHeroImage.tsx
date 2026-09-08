import Image from "next/image"
import { ShipmentStory } from "@/types/shipmentStory"

interface Props {
  story: ShipmentStory
}

export function StoryHeroImage({ story }: Props) {
  if (!story.image) return null

  const isRemote =
    story.image.startsWith("http://") ||
    story.image.startsWith("https://") ||
    story.image.startsWith("/")

  if (!isRemote) return null

  return (
    <div className="w-full">
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-900">
        <Image
          src={story.image}
          alt={story.imageAlt || story.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      </div>
      {story.imageAlt && (
        <p className="text-xs text-slate-400 italic text-center mt-2.5">
          {story.imageAlt}
        </p>
      )}
    </div>
  )
}

