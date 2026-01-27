import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { advertisementApi } from "../api/advertisementApi" 
import type { Advertisement } from "./types"

export const advertisementsKeys = {
    all: [ 'advertisement' ] as const,
    lists: () => [...advertisementsKeys.all, 'list'] as const,
    list: ( filters: string ) => [...advertisementsKeys.lists(), { filters }] as const,
    details: () => [...advertisementsKeys.all, 'detail'] as const,
    detail: ( id: string ) => [...advertisementsKeys.details(), id] as const
}

export const useAdvertisements = () => {
    return useQuery({
        queryKey: advertisementsKeys.lists(),
        queryFn: advertisementApi.getAdvertisements,
        staleTime: 1 * 60 * 1000
    })
}

export const useAdvertisement = ( id: string, enabled = true ) => {
    return useQuery<{ data: Advertisement }>({
        queryKey: advertisementsKeys.detail(id),
        queryFn: () => advertisementApi.getAdvertisement(id),
        enabled,
        staleTime: 1 * 60 * 1000,
    })
}

export const useUpdateAdvertisement = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: Partial<Advertisement>}) => advertisementApi.updateAdvertisement(id, data),
        onSuccess: ( _result, { id } ) => {
            queryClient.invalidateQueries({ queryKey: advertisementsKeys.lists() })
            queryClient.invalidateQueries({ queryKey: advertisementsKeys.detail(id) })
        }
    })
}

export const useDeleteAdvertisement = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ( id: string ) => advertisementApi.deleteAdvertisement(id),
        onSuccess: ( _result, id ) => {
            queryClient.invalidateQueries({ queryKey: advertisementsKeys.lists() })
            queryClient.invalidateQueries({ queryKey: advertisementsKeys.detail(id) })
        }
    })
}