import { redirect } from "next/navigation";
import { dashboardUrl } from "@/lib/dashboard";
export default function Page() { redirect(dashboardUrl("/dashboard/projects")); }
