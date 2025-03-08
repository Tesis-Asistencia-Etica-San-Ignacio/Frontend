import React from "react"
import { MainNav } from "../molecules/top-navigation/Main-nav"
import { UserNav } from "../molecules/top-navigation/User-nav"
import { cn } from "@/lib/utils"

export interface TopBarProps {
    className?: string
}

export const TopBar: React.FC<TopBarProps> = ({ className }) => {
    return (
        <div className={cn("border-b", className)}>
            <div className="flex h-16 items-center px-4">
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <UserNav />
                </div>
            </div>
        </div>
    )
}

export default TopBar
