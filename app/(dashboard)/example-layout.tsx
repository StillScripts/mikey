/* eslint-disable @next/next/no-img-element */
'use client'

import { DesktopSidebar } from './_components/desktop-sidebar'
import { StickyHeader } from './_components/sticky-header'

export default function ExampleLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {/* Static sidebar for desktop */}
      <DesktopSidebar />

      <div className="lg:pl-72">
        <StickyHeader />
        <main className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
