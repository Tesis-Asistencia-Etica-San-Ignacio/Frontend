import { LayoutGrid, Upload, FileStack, ChartLine, Settings, User, Palette, BrainCircuit, FilePlus2 } from "lucide-react";
import type { SidebarData } from "../types/sideBar";

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: "Menú",
      items: [
        { title: "Inicio", url: "/inicio", icon: LayoutGrid, roles: ["EVALUADOR"] },
        { title: "Subir archivos", url: "/subir-archivos", icon: Upload, roles: ["EVALUADOR"] },
        { title: "Historial", url: "/historial-archivos-evaluados", icon: FileStack, roles: ["EVALUADOR"] },
        { title: "Historial", url: "/historial-archivos", icon: FileStack, roles: ["INVESTIGADOR"] },
        { title: "Crear nuevo caso", url: "/crear-nuevo-caso", icon: FilePlus2, roles: ["INVESTIGADOR"] },
        { title: "Estadísticas", url: "/estadisticas", icon: ChartLine, roles: ["EVALUADOR"] }
      ]
    },
    {
      title: "Otros",
      items: [
        {
          title: "Ajustes",
          icon: Settings,
          items: [
            { title: "Cuenta", url: "/ajustes/cuenta", icon: User },
            { title: "Prompts", url: "/ajustes/prompts", icon: BrainCircuit },
            { title: "Apariencia", url: "/ajustes/apariencia", icon: Palette }
          ]
        }
      ]
    }
  ]
};
