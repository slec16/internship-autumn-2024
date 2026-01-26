import { ThemeConfig } from "antd"
import { Theme } from "@/shared/lib/theme"
import { theme as antdTheme } from 'antd'

export const getThemeTokens = (theme: Theme): ThemeConfig['token'] => {
    if (theme === 'dark') {
        return {
            // Цвета
            colorPrimary: '#1890ff',
            colorSuccess: '#52c41a',
            colorWarning: '#faad14',
            colorError: '#ff4d4f',
            colorInfo: '#1890ff',

            // Фон
            colorBgContainer: '#1f1f1f',
            colorBgElevated: '#262626',
            colorBgLayout: '#141414',

            // Текст
            colorText: '#ffffff',
            colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
            colorTextTertiary: 'rgba(255, 255, 255, 0.45)',

            // Бордеры
            colorBorder: '#434343',
            colorBorderSecondary: '#303030',

            // Тени
            boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.32), 0 3px 6px -4px rgba(0, 0, 0, 0.48), 0 9px 28px 8px rgba(0, 0, 0, 0.24)',
            boxShadowSecondary: '0 3px 6px -4px rgba(0, 0, 0, 0.48), 0 6px 16px 0 rgba(0, 0, 0, 0.32), 0 9px 28px 8px rgba(0, 0, 0, 0.24)',

            // Радиусы
            borderRadius: 6,
            borderRadiusLG: 8,
            borderRadiusSM: 4,
        }
    }
    return {
        // Цвета
        colorPrimary: '#722ed1',
        colorSuccess: '#52c41a',
        colorWarning: '#faad14',
        colorError: '#ff4d4f',
        colorInfo: '#1890ff',

        // Фон
        colorBgContainer: '#ffffff',
        colorBgElevated: '#ffffff',
        colorBgLayout: '#f5f5f5',

        // Текст
        colorText: '#141414',
        colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
        colorTextTertiary: 'rgba(0, 0, 0, 0.45)',

        // Бордеры
        colorBorder: '#d9d9d9',
        colorBorderSecondary: '#f0f0f0',

        // Тени
        boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
        boxShadowSecondary: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',

        // Радиусы
        borderRadius: 6,
        borderRadiusLG: 8,
        borderRadiusSM: 4,
    }
}

export const getThemeConfig = (theme: Theme): ThemeConfig => {
    return {
        algorithm:
            theme === 'dark'
                ? antdTheme.darkAlgorithm
                : antdTheme.defaultAlgorithm,
        token: getThemeTokens(theme)

    }
}