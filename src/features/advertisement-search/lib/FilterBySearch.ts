import type { Advertisement } from "@/entities/advertisement"

export const filterBySearch = (items: Advertisement[], q: string): Advertisement[] => {
    if (!items.length) return []

    if (!q) return items

    return items.filter((item) => item.name.toLowerCase().includes(q))
}