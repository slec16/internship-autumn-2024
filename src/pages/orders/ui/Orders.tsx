import style from "./Orders.module.scss"
import { List } from "@/widgets/list"
import { useOrders, columns } from "@/entities/order"
import { useQueryParams } from '@/shared/lib/useQueryParams'
import { Select, InputNumber } from 'antd'
import type { Order, IOrdersParams } from "@/entities/order"

const Orders = () => {
    const { getParam, searchParams, setSearchParams } = useQueryParams()

    const page = Number(getParam("page")) || 1
    const perPage = Number(getParam("perPage")) || 10
    const sortField = getParam("sortField") || ""
    const sortType = getParam("sortType") || ""

    const statusParam = getParam("status")
    const fromParam = getParam("from")
    const toParam = getParam("to")

    const status = statusParam ? Number(statusParam) : undefined
    const from = fromParam ? Number(fromParam) : undefined
    const to = toParam ? Number(toParam) : undefined

    const statusHandler = (value: number) => {
        console.log(value)
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev)
            value == undefined ? params.delete('status') : params.set('status', String(value))
            return params
        })
    }

    const fromValueHandler = (value: number | null) => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev)
            value == null ? params.delete('from') : params.set('from', String(value))
            return params
        })
    }

    const toValueHandler = (value: number | null) => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev)
            value == null ? params.delete('to') : params.set('to', String(value))
            return params
        })
    }

    const params: IOrdersParams  = {
        page,
        perPage,
        sortField,
        sortType,
        status: Number.isNaN(status) ? undefined : status,
        from: Number.isNaN(from) ? undefined : from,
        to: Number.isNaN(to) ? undefined : to,
    }

    const { data: orders, isLoading, error } = useOrders(params)

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
                    value={status}
                    allowClear
                    onChange={(value) => statusHandler(value)}
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
                <InputNumber
                    size='large'
                    placeholder='Минимальная сумма'
                    style={{width: 200}}
                    value={from}
                    min={0}
                    max={to ? to - 1 : undefined}
                    onChange={(value) => fromValueHandler(value)}
                />
                -
                <InputNumber
                    size='large'
                    placeholder='Максимальная сумма'
                    style={{width: 200}}
                    value={to}
                    min={from ? from + 1 : 0}
                    onChange={(value) => toValueHandler(value)}
                />
            </div>
            { isLoading
                ? <div>Загрузка...</div>
                : orders
                    ? <List<Order>
                        columns={columns}
                        items={orders.data}
                        params={params}
                        total={orders.items}
                        rowKey="id"
                        onRowClick={(record) => console.log(record)}
                    />
                    : <p>Пока пусто</p>

            }
        </>
    )
}

export default Orders