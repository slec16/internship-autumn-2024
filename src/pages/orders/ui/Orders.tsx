import { useMemo } from "react"
import style from "./Orders.module.scss"
import { List } from "@/widgets/list"
import { useOrders, columns } from "@/entities/order"
import { useQueryParams } from '@/shared/lib/useQueryParams'
import { Select, InputNumber } from 'antd'
import type { Order } from "@/entities/order"

const Orders = () => {
    const { getParam, searchParams, setSearchParams } = useQueryParams()

    const page = Number(getParam("page")) || 1
    const perPage = Number(getParam("perPage")) || 10
    const sortField = getParam("sortField") || ""
    const sortType = getParam("sortType") || ""

    const params = {
        page,
        perPage,
        sortField,
        sortType,
    }

    const { data: orders, isLoading, error } = useOrders()

    console.log(orders)

    if (isLoading) return (
        <div>Загрузка...</div>
    )

    if (error) return (
        <div>Возникла ошибка</div>
    )

    return (
        <>
            <div className={style.filtersContainer}>
                <Select
                    size='large'
                    placeholder="Статус"
                    style={{ width: 300 }}
                    // value={selectedFilter}
                    allowClear
                    // onChange={handleChange}
                    options={[
                        { value: 0, label: 'Создан' },
                        { value: 1, label: 'Оплачен' },
                        { value: 2, label: 'Транспортировка' },
                        { value: 3, label: 'Доставка до пункта выдачи' },
                        { value: 4, label: 'Получено' },
                        { value: 5, label: 'Архив' },
                        { value: 6, label: 'Отказ' },
                    ]}
                />
            </div>
            {orders
                ? <List<Order>
                    columns={columns}
                    items={orders}
                    params={params}
                    total={orders.length}
                    rowKey="id"
                    onRowClick={(record) => console.log(record)}
                />
                : <p>Пока пусто</p>

            }
        </>
    )
}

export default Orders