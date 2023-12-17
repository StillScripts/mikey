import { Toaster } from '@/components/ui/toaster'
import ExampleLayout from './example-layout'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <ExampleLayout>
    {children}
    <Toaster />
  </ExampleLayout>
)

export default DashboardLayout
