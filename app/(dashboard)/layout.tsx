import { Toaster } from '@/components/ui/toaster'
import { DesktopSidebar } from '@/app/(dashboard)/_components/desktop-sidebar'
import { StickyHeader } from '@/app/(dashboard)/_components/sticky-header'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <DesktopSidebar />
    <div className="lg:pl-72">
      <StickyHeader />
      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
    <Toaster />
  </div>
)

export default DashboardLayout
