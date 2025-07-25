import type { ReactNode } from "react"
import { Header } from "../organisms/Header"
import { Button } from "../atoms/Button"
import { Icon } from "../atoms/Icon"
import { Link } from "../atoms/Link"

interface MainLayoutProps {
    children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="min-h-screen  text-neutral-dark font-sans bg-background-base">
            <Header />
            <main>{children}</main>
            <Icon name="analyze" />
            <Button><p>hola</p></Button>
            <Link href="#">Hello esto es un link</Link>
        </div>
    )
}
