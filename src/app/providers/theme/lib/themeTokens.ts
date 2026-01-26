import { ThemeConfig } from "antd"
import { Theme } from "@/shared/lib/theme"
import { theme as antdTheme } from 'antd'

export const getThemeTokens = (theme: Theme): ThemeConfig['token'] => {
    if (theme === 'dark') {
        return {

            colorPrimary: '#fa8c16',
            colorSuccess: '#52c41a',
            colorWarning: '#faad14',
            colorError: '#ff4d4f',
            colorInfo: '#fa8c16',

            colorBgContainer: '#1f1408',
            colorBgElevated: '#26180a',
            colorBgLayout: '#120a04',

            colorText: '#ffffff',
            colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
            colorTextTertiary: 'rgba(255, 255, 255, 0.45)',

            colorBorder: '#8c5a1a',
            colorBorderSecondary: '#593716',

            boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.48), 0 3px 6px -4px rgba(0, 0, 0, 0.6), 0 9px 28px 8px rgba(0, 0, 0, 0.4)',
            boxShadowSecondary: '0 3px 6px -4px rgba(0, 0, 0, 0.6), 0 6px 16px 0 rgba(0, 0, 0, 0.48), 0 9px 28px 8px rgba(0, 0, 0, 0.4)',

            borderRadius: 6,
            borderRadiusLG: 8,
            borderRadiusSM: 4,
        }
    }
    return {
        colorPrimary: '#1677ff',
        colorSuccess: '#52c41a',
        colorWarning: '#faad14',
        colorError: '#ff4d4f',
        colorInfo: '#1677ff',

        colorBgContainer: '#f0f5ff',
        colorBgElevated: '#ffffff',
        colorBgLayout: '#e6f4ff',

        colorText: '#141414',
        colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
        colorTextTertiary: 'rgba(0, 0, 0, 0.45)',

        colorBorder: '#91caff',
        colorBorderSecondary: '#bae0ff',

        boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
        boxShadowSecondary: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',

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