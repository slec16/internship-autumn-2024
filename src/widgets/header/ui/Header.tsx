import { Link, useNavigate, useMatch } from "react-router-dom"
import { useTheme } from "@/shared/lib/theme"
import { Button } from 'antd'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'
import styles from "./Header.module.scss"
import TabsRouter from "@/features/tabs-router"
import { useEffect } from "react"

const Header = () => {

    const { theme, toggleTheme } = useTheme()
    const navigate = useNavigate()
    const match = useMatch('/advertisements/:id')
    const id = match?.params.id

    useEffect(() => {
        console.log(id)
    }, [id])

    return (
        <div className={styles.headerContainer}>
            <header className={styles.header}>
                <Link to={'/'} style={{ textDecoration: 'none' }}>
                    <h1 className={styles.title}><span className={styles.name}>Marketplace</span> Seller</h1>
                </Link>
                <Button onClick={toggleTheme} type="primary" shape="circle" icon={theme === 'dark' ? <SunOutlined /> : <MoonOutlined />} />
            </header>
            {!id && <TabsRouter />}
        </div>

    )
}

export default Header