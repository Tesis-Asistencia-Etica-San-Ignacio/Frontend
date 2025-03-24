import { useAuthContext } from "@/context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

export default function ResearcherRoutes() {
    const { userType, isAuthLoading } = useAuthContext()

    if (isAuthLoading) {
        return <div>Cargando...</div>
    }

    if (userType === "INVESTIGADOR") {
        return <Outlet />
    }

    return <Navigate to="/auth" />
}
