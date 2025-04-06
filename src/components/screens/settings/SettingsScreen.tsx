import SettingsTemplate, { SidebarNavItem } from "@/components/templates/settings/SettingsTemplate"
import { BrainCircuit, Palette, User  } from "lucide-react"

const sidebarNavItems: SidebarNavItem[] = [
    {
        title: 'Cuenta',
        icon: <User size={18} />,
        href: '/ajustes/cuenta',
    },
    {
        title: 'Prompts',
        icon: <BrainCircuit size={18} />,
        href: '/ajustes/prompts',
    },
    {
        title: 'Apariencia',
        icon: <Palette size={18} />,
        href: '/ajustes/apariencia',
    },
    
]

export default function SettingsScreen() {
    return <SettingsTemplate sidebarNavItems={sidebarNavItems} />
}
