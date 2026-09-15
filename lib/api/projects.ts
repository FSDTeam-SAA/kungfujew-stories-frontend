const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export interface Project {
  _id: string
  name: string
  figmaLink?: string
  websiteLink?: string
  adminLink?: string
  type: "web" | "app"
  category?: string
  profile?: string
  createdAt: string
  updatedAt?: string
}

export interface ProjectListResponse {
  success: boolean
  data: Project[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasPrevPage: boolean
    hasNextPage: boolean
  }
}

export async function fetchProjects(
  token: string,
  params: { page?: number; limit?: number; search?: string; category?: string; type?: string }
): Promise<ProjectListResponse> {
  const p = new URLSearchParams()
  p.append("page", (params.page || 1).toString())
  p.append("limit", (params.limit || 10).toString())
  if (params.search) p.append("search", params.search)
  if (params.category) p.append("category", params.category)
  if (params.type) p.append("type", params.type)

  const res = await fetch(`${API_BASE}/api/v1/projects?${p.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error("Failed to fetch projects")
  return (await res.json()) as ProjectListResponse
}

export async function createProject(
  token: string,
  data: Record<string, unknown>
): Promise<Project> {
  const res = await fetch(`${API_BASE}/api/v1/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || "Failed to create project")
  return json.data as Project
}

export async function updateProject(
  token: string,
  id: string,
  data: Record<string, unknown>
): Promise<Project> {
  const res = await fetch(`${API_BASE}/api/v1/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || "Failed to update project")
  return json.data as Project
}

export async function deleteProject(
  token: string,
  id: string
): Promise<void> {
  const res = await fetch(`${API_BASE}/api/v1/projects/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error("Failed to delete project")
}
