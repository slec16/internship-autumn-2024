import { Table, Image, ListProps } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useNavigate } from "react-router-dom"
import { useQueryParams } from "@/shared/lib/useQueryParams"

interface IParams {
    page: number,
    perPage: number,
    sortType: string,
    sortField: string
}

const List = <T,> ({ columns, items, params, total }: { columns: ColumnsType<T>, items: any[], params: IParams, total: number | undefined }) => {

    const navigate = useNavigate()

    const { page, perPage } = params
    const { searchParams, setSearchParams } = useQueryParams()

    const paginationHandler = ( page: number, pageSize: number ) => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev)

            params.delete('page')
            params.delete('perPage')
           

            params.set('page', String(page))
            params.set('perPage', String(pageSize))
            
            
            return params
        })
    }

    return(
        <Table
            columns={columns}
            dataSource={items}
            rowKey="id"
            pagination={{
                align: "center",
                current: page,
                pageSize: perPage,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20"],
                total: total,
                onChange: paginationHandler
            }}
            scroll={{ x: 900 }}
            onRow={(record) => ({
                onClick: () => navigate(`/advertisements/${record.id}`),
                style: { cursor: "pointer" }
            })}
        />
    )
}

export default List