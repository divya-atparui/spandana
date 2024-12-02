import { SideNav } from "@/components/admin/side-nav"
import { TopNav } from "@/components/admin/top-nav"
import { AdminBreadcrumb } from "@/components/admin/breadcrumb"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="flex">
        <SideNav />
        <main className="flex-1 p-8">
          {/* <AdminBreadcrumb /> */}
          {children}
        </main>
      </div>
    </div>
  )
}
