import type { Advertisement } from "@/entities/advertisement"

export const filterByParams = ( items: Advertisement[], searchParams: URLSearchParams ): Advertisement[] => {
    if( !items.length ) return []
    console.log(items)
    // TODO: проверки
    const type = searchParams.get("filterType")
    const fromValue = searchParams.get("from")
    const toValue = searchParams.get("to")

    
    return items.filter((item) => {
        if ( type == 'price' ) {
            if( fromValue && item.price < Number(fromValue) ) return false
            if( toValue && item.price > Number(toValue) ) return false
            return true
        }
        if ( type == 'views' ) {
            if( fromValue && item.views < Number(fromValue) ) return false
            if( toValue && item.views > Number(toValue) ) return false
            return true
        } 
        if ( type == 'likes' ) {
            if( fromValue && item.likes < Number(fromValue) ) return false
            if( toValue && item.likes > Number(toValue) ) return false
            return true
        }
        return true
    })
}