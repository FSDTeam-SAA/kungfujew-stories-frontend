export function dashboardUrl(path = "/") {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return new URL(path, origin).toString();
}
