export function dashboardUrl(path = "/") {
  const origin = process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001";
  return new URL(path, origin).toString();
}
