import { useState } from 'react'
import { useQueryParams } from '@/shared/lib/useQueryParams'
import { Select, InputNumber, Button } from 'antd'
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

    const changeFilterHandler = (value: string) => {
        setSelectedFilter(value)
        setFromValue(null)
        setToValue(null)
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev)
            params.delete('to')
            params.delete('from')
            params.delete('filterType')
            return params
        })
    }

    const applyFilterHandler = () => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev)
            selectedFilter == null ? params.delete('filterType') : params.set('filterType', selectedFilter)
            fromValue != null ? params.set('from', String(fromValue)) : params.delete('from')
            toValue != null ? params.set('to', String(toValue)) : params.delete('to')
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
                onChange={changeFilterHandler}
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
                        onChange={(value) => setFromValue(value)}
                    />
                    -
                    <InputNumber
                        size='large'
                        placeholder='До'
                        value={toValue}
                        min={fromValue ? fromValue + 1 : 0}
                        onChange={(value) => setToValue(value)}
                    />
                    <Button
                        type='primary'
                        size='large'
                        onClick={applyFilterHandler}
                    >
                        Применить
                    </Button>
                </>
            }
        </div>
    )
}

export default Filter