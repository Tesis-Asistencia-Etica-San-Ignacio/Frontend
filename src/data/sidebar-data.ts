import { LayoutGrid, Upload, FileStack, ChartLine, Settings, User, Palette, BrainCircuit } from "lucide-react";
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
      title: 'Otros',
      items: [
        {
          title: 'Ajustes',
          icon: Settings,
          items: [
            {
              title: 'Cuenta',
              url: '/ajustes/cuenta',
              icon: User,
            },
            {
              title: 'Prompts',
              url: '/ajustes/prompts',
              icon: BrainCircuit,
            },
            {
              title: 'Apariencia',
              url: '/ajustes/apariencia',
              icon: Palette,
            },
            
          ],
        }
      ],
    },
  ],
};
