import type { Advertisement, IAdvertisementsParams, IAdvertisementsResponse } from "../model/types"

const baseUrl = "http://localhost:3000"

export const advertisementApi = {
    getAdvertisements: async ( params: IAdvertisementsParams ): Promise< IAdvertisementsResponse > => {
        const response = await fetch(`${baseUrl}/advertisements?_page=${params.page}&_per_page=${params.perPage}`)
        if (!response.ok) throw new Error('Failed to fetch advertisements')
        return response.json()
    },

    getAdvertisement: async (id: string): Promise<{ data: Advertisement }> => {
        const response = await fetch(`${baseUrl}/advertisements/${id}`)
        if (!response.ok) throw new Error('Failed to fetch advertisement')
        return response.json()
    },

    updateAdvertisement: async (id: string, data: Partial<Advertisement>): Promise<{ data: Advertisement }> => {
        const response = await fetch(`${baseUrl}/advertisements/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) throw new Error('Failed to update advertisement')
        return response.json()
    },

    deleteAdvertisement: async (id: string): Promise<void> => {
        const response = await fetch(`${baseUrl}/advertisements/${id}`, {
            method: "DELETE"
        })
        if (!response.ok) throw new Error('Failed to delete advertisement')
        return response.json()
    }
}