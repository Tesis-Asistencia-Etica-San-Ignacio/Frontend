import { Outlet } from "react-router-dom"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger
} from "../atoms/ui/sidebar"
import { Main } from "../atoms/Main"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "../atoms/ui/breadcrumb"
import { Separator } from "../atoms/ui/separator"
import { AppSidebar } from "../organisms/AppSideBar"
import type { SidebarData } from "@/types/sideBar"
import type { User } from "@/types/userType"

interface LayoutTemplateProps {
  user: User | null
  sidebarData: SidebarData
  onLogout: () => Promise<void>
  getInitials: () => string
}

export default function LayoutTemplate({
  user,
  sidebarData,
  onLogout,
  getInitials,
}: LayoutTemplateProps) {
  
  return (
    <SidebarProvider>
      <AppSidebar
        user={user}
        sidebarData={sidebarData}
        onLogout={onLogout}
        getInitials={getInitials}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Main fixed>
          <Outlet />
        </Main>
      </SidebarInset>
    </SidebarProvider>
  )
}
