import { Tabs } from "antd"
import type { TabsProps } from "antd"
import { useLocation, useNavigate } from "react-router-dom"

const TabsRouter = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    let currentTab: string = "/advertisements"

    if (pathname.startsWith("/orders")) {
        currentTab = "/orders"
    } else if (pathname.startsWith("/advertisements")) {
        currentTab = "/advertisements"
    }

    const items: TabsProps["items"] = [
        { key: "/advertisements", label: "Объявления" },
        { key: "/orders", label: "Заказы" },
    ]

    return (
        <Tabs
            items={items}
            activeKey={currentTab}
            onChange={(key) => {
                navigate(key)
            }}
        />
    )
}

export default TabsRouter