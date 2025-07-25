import type { ReactNode } from "react"
import { Header } from "../organisms/Header"
import { Button } from "../atoms/Button"

interface MainLayoutProps {
    children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="min-h-screen  text-neutral-dark font-sans bg-background-base">
            <Header />
            <main>{children}</main>
            <Button><p>hola</p></Button>
        </div>
    )
}
