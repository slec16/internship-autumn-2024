import { Table, Image } from "antd"
import { useNavigate } from "react-router-dom"
import type { ColumnsType } from "antd/es/table"
import type { Advertisement } from "@/entities/advertisement"


const columns: ColumnsType<Advertisement> = [
    {
        title: () => <span style={{ fontWeight: "lighter", fontSize: "16px" }}>Изображение</span>,
        dataIndex: "imageUrl",
        key: "imageUrl",
        width: 150,
        align: "center",
        render: (imageUrl: string) => (
            <div style={{ display: "inline-block" }} onClick={(e) => e.stopPropagation()}>
                {imageUrl
                    ? (
                        <Image
                            src={imageUrl}
                            alt="Товар"
                            width={80}
                            height={80}
                            style={{ objectFit: "cover", borderRadius: 8 }}
                        />
                    )
                    : (
                        <div
                            style={{
                                width: 80,
                                height: 80,
                                background: "#d8d8d8",
                                borderRadius: 8,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#838282"
                            }}
                        >
                            Нет фото
                        </div>
                    )
                }
            </div>
        ),
    },
    {
        title: <span style={{ fontWeight: "lighter", fontSize: "16px" }}>Название</span>,
        dataIndex: "name",
        key: "name",
        width: 300,
        align: "center",
        ellipsis: true,
        render: (name: string) => <span style={{ fontWeight: "bold" }}>{ name }</span>,
    },
    {
        title: <span style={{ fontWeight: "lighter", fontSize: "16px" }}>Описание</span>,
        dataIndex: "description",
        key: "description",
        ellipsis: true,
        align: "center",
        render: (description: string) => description || "-"
    },
    {
        title: <span style={{ fontWeight: "lighter", fontSize: "16px" }}>Цена</span>,
        dataIndex: "price",
        key: "price",
        width: 120,
        align: "center",
        sorter: (a, b) => a.price - b.price,
        showSorterTooltip: false,
        render: (price: number) => `${price.toLocaleString("ru-RU")} ₽`
    },
    {
        title: <span style={{ fontWeight: "lighter", fontSize: "16px" }}>Просмотры</span>,
        dataIndex: "views",
        key: "views",
        width: 150,
        align: "center",
        sorter: (a, b) => a.views - b.views,
        showSorterTooltip: false,
        render: (views: number) => views.toLocaleString("ru-RU")
    },
    {
        title: <span style={{ fontWeight: "lighter", fontSize: "16px" }}>Лайки</span>,
        dataIndex: "likes",
        key: "likes",
        width: 120,
        align: "center",
        sorter: (a, b) => a.likes - b.likes,
        showSorterTooltip: false,
        render: (likes: number) => likes.toLocaleString("ru-RU")
    },
    {
        title: <span style={{ fontWeight: "lighter", fontSize: "16px" }}>Дата создания</span>,
        dataIndex: "createdAt",
        key: "createdAt",
        width: 150,
        align: "center",
        render: (date: number) => new Date(date).toLocaleString("ru-RU")
    }
]

const List = ({ items }: { items: Advertisement[] }) => {
    const navigate = useNavigate()

    return (
        <Table
            columns={columns}
            dataSource={items}
            rowKey="id"
            pagination={{ pageSize: 10, showSizeChanger: true, pageSizeOptions: ["5", "10", "20"] }}
            scroll={{ x: 900 }}
            onRow={(record) => ({
                onClick: () => navigate(`/advertisements/${record.id}`),
                style: { cursor: "pointer" }
            })} 
        />
    )
}

export default List