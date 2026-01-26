import { Link, useNavigate } from "react-router-dom"
import { useTheme } from "@/shared/lib/theme" 
import { Button } from 'antd'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'
import styles from "./Header.module.scss"

const Header = () => {

    const { theme, toggleTheme } = useTheme()
    const navigate = useNavigate()

    return(
        <header className={styles.header}>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
                <h1 className={styles.title}><span className={styles.name}>Marketplace</span> Seller</h1>
            </Link>
            <Button onClick={toggleTheme} type="primary" shape="circle" icon={theme === 'dark' ? <SunOutlined /> : <MoonOutlined />} />
        </header>
    )
}

export default Header