import React from "react"
import { Spinner } from "@/components/atoms/Spinner"

export const LoadingFallback: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <Spinner size="lg" variant="primary" />
            <p className="mt-4 text-lg text-gray-700">Cargando...</p>
        </div>
    )
}
