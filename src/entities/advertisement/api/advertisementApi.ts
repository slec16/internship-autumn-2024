import type {
    Advertisement,
    AdvertisementFilterField,
    IAdvertisementsParams,
    IAdvertisementsResponse,
} from "../model/types"

// TODO: add .env file
const baseUrl = "http://localhost:3000"

const filterFields: AdvertisementFilterField[] = ['price', 'views', 'likes']

export const advertisementApi = {
    getAdvertisements: async ( params: IAdvertisementsParams ): Promise< IAdvertisementsResponse > => {
        const searchParams = new URLSearchParams({
            _page: String(params.page),
            _per_page: String(params.perPage),
        })

        if (params.sortField) {
            searchParams.set('_sort', `${params.sortType === 'desc' ? '-' : ''}${params.sortField}`)
        }

        // if (params.q) {
        //     searchParams.set('name:startsWith', String(params.q))
        // }

        if (params.filterField && filterFields.includes(params.filterField)) {
            if (params.from !== undefined) {
                searchParams.set(`${params.filterField}_gt`, String(params.from))
            }

            if (params.to !== undefined) {
                searchParams.set(`${params.filterField}_lt`, String(params.to))
            }
        }

        const response = await fetch(`${baseUrl}/advertisements?${searchParams.toString()}`)
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