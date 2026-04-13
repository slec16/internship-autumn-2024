import { Image } from "antd"
import type { ColumnsType } from "antd/es/table"
import { statusToText, type Order } from "@/entities/order"
import type { Advertisement } from "@/entities/advertisement"
import ItemsPreview from "./ItemsPreview"


export const columns: ColumnsType<Order> = [
    {
        title: <span style={{ fontWeight: "lighter", fontSize: "16px" }}>Товары</span>,
        dataIndex: "items",
        key: "items",
        width: 150,
        align: "center",
        render: (items: Advertisement[]) => (
            <div>
                <ItemsPreview items={items} />
            </div>
        ),
    },
    {
        title: <span style={{ fontWeight: "lighter", fontSize: "16px" }}>Статус</span>,
        dataIndex: "status",
        key: "status",
        width: 150,
        align: "center",
        render: (status: number) => <span>{statusToText[status]}</span>,
    },
    {
        title: <span style={{ fontWeight: "lighter", fontSize: "16px" }}>Способ доставки</span>,
        dataIndex: "deliveryWay",
        key: "deliveryWay",
        width: 150,
        align: "center",
        render: (way: string) => <span>{way}</span>,
    },
    {
        title: <span style={{ fontWeight: "lighter", fontSize: "16px" }}>Дата создания</span>,
        dataIndex: "createdAt",
        key: "createdAt",
        width: 150,
        align: "center",
        render: (date: number) => new Date(date).toLocaleString("ru-RU")
    },
    {
        title: <span style={{ fontWeight: "lighter", fontSize: "16px" }}>Дата доставки</span>,
        dataIndex: "finishedAt",
        key: "finishedAt",
        width: 150,
        align: "center",
        render: (date: number) => date ? new Date(date).toLocaleString("ru-RU") : "-",
    },
    {
        title: <span style={{ fontWeight: "lighter", fontSize: "16px" }}>Сумма</span>,
        dataIndex: "total",
        key: "total",
        width: 150,
        align: "center",
        // TODO: sort
        render: (price: number) => `${price.toLocaleString("ru-RU")} ₽`,
    },
    
]