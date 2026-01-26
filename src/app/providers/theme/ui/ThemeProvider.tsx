import { ReactNode, useEffect, useMemo, useState, useCallback } from "react"
import { ConfigProvider } from "antd"
import { Theme, ThemeContext, THEME_KEY, ThemeContextValue } from "@/shared/lib/theme"
import { getThemeConfig } from "../lib/themeTokens"

interface ThemeProviderProps {
    children: ReactNode
    defaultTheme: Theme
}

export const ThemeProvider = (props: ThemeProviderProps) => {
    const { children, defaultTheme = 'light' } = props

    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('THEME_KEY') as Theme
        if (savedTheme) return savedTheme

        if (typeof window !== 'undefined') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            if (prefersDark) return 'dark'
        }

        return defaultTheme
    })

    useEffect(() => {
        document.body.classList.remove('theme-light', 'theme-dark')
        document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light')
        localStorage.setItem(THEME_KEY, theme)
    }, [theme])

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? 'dark' : 'light')
        }

        mediaQuery.addEventListener('change', handleSystemThemeChange)

        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange)
        }
    }, [])

    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
    }, [])

    const contextValue = useMemo(() => ({
        theme,
        setTheme,
        toggleTheme
    }), [theme, toggleTheme])

    const antdThemeConfig = useMemo(() => getThemeConfig(theme), [theme])

    return(
        <ThemeContext.Provider value={contextValue}>
            <ConfigProvider theme={antdThemeConfig}>{children}</ConfigProvider>
        </ThemeContext.Provider>
    )

}
