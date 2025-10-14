import {ReactNode} from 'react'
import {AppSidebar} from '@/components/layout/app-sidebar'
import {SidebarInset, SidebarProvider} from '@/components/ui/sidebar'
import {HeaderMain} from '@/components/layout/header-main'


export default async function LangLayout({
                                           children,
                                         }: {
  children: ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <HeaderMain/>
        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>

  )
}
