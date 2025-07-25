import type { ReactNode } from "react"
import { Header } from "../organisms/Header"
import { Button } from "../atoms/Button"
import { Icon } from "../atoms/Icon"
import { Link } from "../atoms/Link"
import { Container } from "../atoms/Container"

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
            <Container padding="md" margin="sm" hasBorder>
                <p>Hola, soy un container con padding, margen y borde 👋</p>
            </Container>
        </div>
    )
}
