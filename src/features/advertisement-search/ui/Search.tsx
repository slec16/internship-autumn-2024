import { useEffect, useState } from "react"
import { useDebounce } from "@/shared/lib/useDebounce"
import { useQueryParams } from "@/shared/lib/useQueryParams"
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const Search = () => {
    const { searchQuery, setSearchQuery } = useQueryParams()
    const [localValue, setLocalValue] = useState(searchQuery || '')
    const debouncedValue = useDebounce(localValue, 500)

    useEffect(() => {
        setSearchQuery(debouncedValue)
    }, [debouncedValue, setSearchQuery])

    return (
        <>
            <Input
                value={localValue}
                onChange={(e) => setLocalValue(e.currentTarget.value)}
                placeholder="Название"
                prefix={<SearchOutlined />}
                allowClear
                size='large'
            />
        </>
    )
}

export default Search