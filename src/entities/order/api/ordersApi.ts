import type { Order, IOrdersParams } from "../model/types"

// TODO: add .env file
const baseUrl = "http://localhost:3000"

export const orderApi = {
    // TODO: IOrdersResponse
    getOrders: async (params: IOrdersParams): Promise<any> => {

        const searchParams = new URLSearchParams({
            _page: String(params.page),
            _per_page: String(params.perPage),
        })

        if (params.sortField) {
            searchParams.set('_sort', `${params.sortType === 'desc' ? '-' : ''}${params.sortField}`)
        }

        if ( params.status !== undefined ) {
            searchParams.set('status', String(params.status))
        }

        if (params.from !== undefined) {
            searchParams.set('total_gt', String(params.from))
        }

        if (params.to !== undefined) {
            searchParams.set('total_lt', String(params.to))
        }
       

        const response = await fetch(`${baseUrl}/orders?${searchParams.toString()}`)
        if (!response.ok) throw new Error('Failed to fetch orders')
        return response.json()
    },

    getOrder: async (id: string): Promise<{ data: Order }> => {
        const response = await fetch(`${baseUrl}/orders${id}`)
        if (!response.ok) throw new Error('Failed to fetch orders')
        return response.json()
    }
}