import { useAuthContext } from "@/context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

export default function EvaluatorRoutes() {
    const { userType, isAuthLoading } = useAuthContext()
    if (isAuthLoading) {
        return <div>Cargando...</div>
    }

    if (userType === "EVALUADOR") {
        return <Outlet />
    }

    return <Navigate to="/auth" />
}
