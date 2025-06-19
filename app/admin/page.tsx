export const dynamic = "force-dynamic"

import { MainLayout } from "@/components/layout/main-layout"
import { AdminPageContent } from "@/components/admin/admin-page-content"

export default function AdminPage() {
  return (
    <MainLayout>
      <AdminPageContent />
    </MainLayout>
  )
}
