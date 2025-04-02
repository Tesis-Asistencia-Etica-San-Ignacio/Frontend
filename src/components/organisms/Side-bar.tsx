import * as React from "react"
import {
    LayoutGrid,
    Upload,
    History,
    FileStack,
    ChartLine,
} from "lucide-react"


import { NavMain } from "../molecules/side-navigation/Nav-main"
import { NavUser } from "../molecules/side-navigation/Nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "../atoms/ui/sidebar"

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Inicio",
            url: "/inicio",
            icon: LayoutGrid,
        },
        {
            title: "Subir archivos",
            url: "/subir-archivos",
            icon: Upload,
        },
        {
            title: "Historial de archivos",
            url: "/evaluacion",
            icon: FileStack,
        },
       /*  {
            title: "Historial de casos",
            url: "#",
            icon: History,
        }, */
        {
            title: "Estadísticas",
            url: "estadisticas",
            icon: ChartLine,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <img src="src/assets/Logo_HUSI_Blanco.png" alt="Logo hospital Universitario San Ignacio" />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
