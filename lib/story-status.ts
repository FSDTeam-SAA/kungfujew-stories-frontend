export function storyStatusLabel(status: string): string {
  switch (status) {
    case "pending": return "Pending"
    case "in_transit": return "In transit"
    case "delivered": return "Delivered"
    case "cancelled": return "Cancelled"
    default: return "Status unavailable"
  }
}
