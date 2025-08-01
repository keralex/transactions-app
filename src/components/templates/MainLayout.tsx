import type { ReactNode } from "react"
import { Header } from "../organisms/Header"


interface MainLayoutProps {
    children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="min-h-screen font-public bg-background-base">
            <Header />
            <main>{children}</main>
        </div>
    )
}
