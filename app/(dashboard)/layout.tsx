import { Toaster } from '@/components/ui/toaster'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <div>
    {children}
    <Toaster />
  </div>
)

export default DashboardLayout
