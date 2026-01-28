import { useSearchParams } from 'react-router-dom'
import { useMemo, useCallback } from 'react'

export const useQueryParams = () => {
    const [searchParams, setSearchParams] = useSearchParams()


    const getParam = useCallback((key: string): string => {
        return searchParams.get(key) || ''
    }, [searchParams])


    const setParam = useCallback((key: string, value: string) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            if (value.trim()) {
                newParams.set(key, value.trim())
            } else {
                newParams.delete(key)
            }
            return newParams
        })
    }, [setSearchParams])


    const deleteParam = useCallback((key: string) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            newParams.delete(key)
            return newParams
        })
    }, [setSearchParams])


    const searchQuery = useMemo(() => getParam('q'), [getParam])


    const setSearchQuery = useCallback((value: string) => {
        setParam('q', value)
    }, [setParam])

    return {

        getParam,
        setParam,
        deleteParam,

        searchQuery,
        setSearchQuery,

        searchParams,
        setSearchParams,
    }
}

