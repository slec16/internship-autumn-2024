import type { Advertisement } from "@/entities/advertisement"

export const filterBySearch = (items: Advertisement[], searchParams: URLSearchParams): Advertisement[] => {
    if (!items.length) return []

    const searchQuery = (searchParams.get("q") || "").trim().toLowerCase()

    if (!searchQuery) return items

    return items.filter((item) => item.name.toLowerCase().includes(searchQuery))
}