import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface BreadcrubLink {
  title: string
  href: string
}

export const Breadcrumbs = ({ links }: { links?: BreadcrubLink[] }) => {
  return (
    <div>
      <nav className="sm:hidden" aria-label="Back">
        <a
          href="#"
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <ChevronLeft
            className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          Back
        </a>
      </nav>
      <nav className="hidden sm:flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          <li>
            <div className="flex">
              <a
                href="#"
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Admin
              </a>
            </div>
          </li>
          {links?.map((link) => (
            <li key={link.title}>
              <div className="flex items-center">
                <ChevronRight
                  className="h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <a
                  href={link.href}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {link.title}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
