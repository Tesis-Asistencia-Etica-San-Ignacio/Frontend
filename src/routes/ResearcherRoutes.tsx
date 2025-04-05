import { useAuthContext } from "@/context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

export default function ResearcherRoutes() {
    const { userType } = useAuthContext()

    if (userType === "INVESTIGADOR") {
        return <Outlet />
    }

    return <Navigate to="/no-autorizado" />
}
