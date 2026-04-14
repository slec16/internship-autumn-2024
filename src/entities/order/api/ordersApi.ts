import type { Order } from "../model/types"

// TODO: add .env file
const baseUrl = "http://localhost:3000"

export const orderApi = {
    // TODO: IOrdersResponse
    getOrders: async (): Promise< any > => {
        const response = await fetch(`${baseUrl}/orders`)
        if (!response.ok) throw new Error('Failed to fetch orders')
        return response.json()
    },

    getOrder: async (id: string): Promise<{ data: Order }> => {
        const response = await fetch(`${baseUrl}/orders${id}`)
        if (!response.ok) throw new Error('Failed to fetch orders')
        return response.json()
    }
}