import type { ReactNode } from "react"
import { Header } from "../organisms/Header"

interface MainLayoutProps {
    children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="flex flex-col">
            <Header />
            <main>{children}</main>
        </div>
    )
}
