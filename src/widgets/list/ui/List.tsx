import { useMemo } from "react"
import { Table } from "antd"
import { useQueryParams } from "@/shared/lib/useQueryParams"
import type { ColumnsType } from "antd/es/table"
import type { SorterResult } from "antd/es/table/interface"

export interface IListParams {
    page: number
    perPage: number
    sortField: string
    sortType: string
}

interface ListProps<T> {
    columns: ColumnsType<T>
    items: T[]
    total?: number
    params: IListParams
    rowKey: string
    onRowClick?: (record: T) => void
}

const getSortOrder = (field: string, sortField: string, sortType: string) => {
    if (sortField !== field) return null
    if (sortType === "asc") return "ascend" as const
    if (sortType === "desc") return "descend" as const
    return null
}

const List = <T extends object>({ columns, items, total, params, rowKey, onRowClick }: ListProps<T>) => {
    const { page, perPage, sortField, sortType } = params
    const { setSearchParams } = useQueryParams()

    const columnsWithSort: ColumnsType<T> = useMemo(() =>
        columns.map((col) => ({
            ...col,
            ...(col.sorter
                ? { sortOrder: getSortOrder(String("dataIndex" in col ? col.dataIndex : col.key), sortField, sortType) }
                : {}
            ),
        })),
        [columns, sortField, sortType]
    )

    const tableChangeHandler = (
        pagination: { current?: number; pageSize?: number },
        _filters: unknown,
        sorter: SorterResult<T> | SorterResult<T>[]
    ) => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev)

            // пагинация
            const newPage = pagination.current ?? page
            const newPerPage = pagination.pageSize ?? perPage

            params.set("page", String(newPage))
            params.set("perPage", String(newPerPage))

            // сортировка
            if (!Array.isArray(sorter)) {
                params.delete("sortField")
                params.delete("sortType")

                if (sorter.order && sorter.field) {
                    params.set("sortField", String(sorter.field))
                    params.set("sortType", sorter.order === "ascend" ? "asc" : "desc")
                }
            }

            return params
        })
    }

    return (
        <Table<T>
            columns={columnsWithSort}
            dataSource={items}
            rowKey={rowKey}
            pagination={{
                align: "center",
                current: page,
                pageSize: perPage,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20"],
                total: total,
            }}
            scroll={{ x: 900 }}
            onChange={tableChangeHandler}
            onRow={onRowClick ? (record) => ({
                onClick: () => onRowClick(record),
                style: { cursor: "pointer" },
            }) : undefined}
        />
    )
}

export default List
