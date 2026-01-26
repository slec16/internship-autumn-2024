import { Button } from "antd"
import styles from "./App.module.scss"
import { useTheme } from "@/shared/lib/theme" 

const App = () => {
    const { theme, toggleTheme } = useTheme()
    return(
        <div className="container">
            <h1 className={styles.title}>Marketplace seller</h1>
            <Button type="primary" onClick={toggleTheme}>{theme === "dark" ? "light theme" : "dark theme"}</Button>
        </div>
    )
}

export default App