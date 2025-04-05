import { useAuthContext } from "@/context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

export default function EvaluatorRoutes() {
    const { userType } = useAuthContext()

    if (userType === "EVALUADOR") {
        return <Outlet />
    }

    return <Navigate to="/no-autorizado" />
}
