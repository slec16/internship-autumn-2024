import type { Order } from "../model/types"

const baseUrl = "http://localhost:3000"

export const orderApi = {
    getOrders: async (): Promise<{ data: Order[] }> => {
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