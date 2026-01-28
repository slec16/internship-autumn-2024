import { Table, Image } from "antd"
import { useNavigate } from "react-router-dom"
import type { ColumnsType } from "antd/es/table"
import type { Advertisement } from "@/entities/advertisement"

const columns: ColumnsType<Advertisement> = [
    {
        title: "Изображение",
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
        title: "Название",
        dataIndex: "name",
        key: "name",
        width: 300,
        align: "center",
        ellipsis: true
    },
    {
        title: "Описание",
        dataIndex: "description",
        key: "description",
        ellipsis: true,
        align: "center",
        render: (description: string) => description || "-"
    },
    {
        title: "Цена",
        dataIndex: "price",
        key: "price",
        width: 120,
        align: "center",
        render: (price: number) => `${price.toLocaleString("ru-RU")} ₽`
    },
    {
        title: "Дата создания",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 150,
        align: "center",
        render: (date: number) => new Date(date).toLocaleString("ru-RU")
    },
    {
        title: "Просмотры",
        dataIndex: "views",
        key: "views",
        width: 150,
        align: "center",
        render: (views: number) => views.toLocaleString("ru-RU")
    },
    {
        title: "Лайки",
        dataIndex: "likes",
        key: "likes",
        width: 120,
        align: "center",
        render: (likes: number) => likes.toLocaleString("ru-RU")
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