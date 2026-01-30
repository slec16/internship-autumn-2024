import { useState } from 'react'
import { useQueryParams } from '@/shared/lib/useQueryParams'
import { Select, InputNumber } from 'antd'
import styles from "./Filter.module.scss"

//TODO: в query params хранить price=500000-614999 ?
const Filter = () => {
    const { searchParams, setSearchParams } = useQueryParams()

    const filterType = searchParams.get('filterType') as 'price' | 'views' | 'likes' | null

    const isValidFilterType = (value: string | null): value is 'price' | 'views' | 'likes' => {
        return value === 'price' || value === 'views' || value === 'likes'
    }


    const [selectedFilter, setSelectedFilter] = useState<string | null>(isValidFilterType(filterType) ? filterType : null)
    // TODO: проверка что мин макс из url не конфликтуют
    const [fromValue, setFromValue] = useState<number | null>(Number(searchParams.get('from')) || null)
    const [toValue, setToValue] = useState<number | null>(Number(searchParams.get('to')) || null)

    const handleChange = (value: string) => {
        setSelectedFilter(value)
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev)
            // if (value == undefined) {
            //     params.delete('filterType')
            //     params.delete('to')
            //     params.delete('from')
            // } else {
            //     params.set('filterType', value)
            // }
            value == undefined ? params.delete('filterType') : params.set('filterType',value)
            return params
        })
    }

    const fromValueHandler = (value: number | null) => {
        setFromValue(value)
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev)
            value == null ? params.delete('from') : params.set('from', String(value))
            return params
        })
    }

    const toValueHandler = (value: number | null) => {
        setToValue(value)
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev)
            value == null ? params.delete('to') : params.set('to', String(value))
            return params
        })
    }

    return (
        <div className={styles.container}>
            <Select
                size='large'
                placeholder="Фильтры"
                style={{ width: 200 }}
                value={selectedFilter}
                allowClear
                onChange={handleChange}
                options={[
                    { value: 'price', label: 'Цена' },
                    { value: 'views', label: 'Просмотры' },
                    { value: 'likes', label: 'Лайки' },
                ]}
            />
            {selectedFilter &&
                <>
                    <InputNumber
                        size='large'
                        placeholder='От'
                        value={fromValue}
                        min={0}
                        max={toValue ? toValue - 1 : undefined}
                        onChange={fromValueHandler}
                    />
                    -
                    <InputNumber
                        size='large'
                        placeholder='До'
                        value={toValue}
                        min={fromValue ? fromValue + 1 : 0}
                        onChange={toValueHandler}
                    />
                </>
            }
        </div>
    )
}

export default Filter