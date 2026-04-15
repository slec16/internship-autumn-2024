import { useQuery } from "@tanstack/react-query"
import { orderApi } from "../api/ordersApi"
import type { Order, IOrdersParams, IOrdersResponse } from "./types"

export const ordersKeys = {
    all: ['orders'] as const,
    lists: () => [...ordersKeys.all, 'list'] as const,
    list: (filters: string) => [...ordersKeys.lists(), { filters }] as const,
    details: () => [...ordersKeys.all, 'detail'] as const,
    detail: (id: string) => [...ordersKeys.details(), id] as const
}

export const useOrders = (params: IOrdersParams) => {
    return useQuery<IOrdersResponse>({
        queryKey: [ ...ordersKeys.lists(), params, ],
        queryFn: () => orderApi.getOrders( params ),
        staleTime: 1 * 60 * 1000
    })
}

export const useOrder = ( id: string, enabled = true ) => {
    return useQuery<{ data: Order }>({
        queryKey: ordersKeys.detail(id),
        queryFn: () => orderApi.getOrder(id),
        enabled,
        staleTime: 1 * 60 * 1000,
    })
}