import { Button } from '@/components/ui/button'
import { type BreadcrubLink, Breadcrumbs } from './breadcrumbs'

const PageHeading = ({
  heading,
  links
}: {
  heading: string
  links?: BreadcrubLink[]
}) => {
  return (
    <div className="pb-6">
      <Breadcrumbs links={links} />
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-foreground sm:truncate sm:text-3xl sm:tracking-tight">
            {heading}
          </h2>
        </div>
        <div className="mt-4 space-x-3 flex flex-shrink-0 md:ml-4 md:mt-0">
          <Button type="button" variant="outline">
            Edit
          </Button>
          <Button type="button">Publish</Button>
        </div>
      </div>
    </div>
  )
}

export default PageHeading
