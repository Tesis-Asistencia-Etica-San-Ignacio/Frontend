import { LayoutGrid, Upload, FileStack, ChartLine, Settings, User, UserCheck, Palette, Bell, Monitor } from "lucide-react";
import type { SidebarData } from "../types/sideBar";

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navGroups: [
    {
      title: 'Menú',
      items: [
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
          title: "Evaluación",
          url: "/evaluacion",
          icon: FileStack,
        },
        {
          title: "Historial de archivos",
          url: "/historial-archivos",
          icon: FileStack,
        },
        {
          title: "Estadísticas",
          url: "/estadisticas",
          icon: ChartLine,
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: User,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: UserCheck,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: Monitor,
            },
          ],
        }
      ],
    },
  ],
};
