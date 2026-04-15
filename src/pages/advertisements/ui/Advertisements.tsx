import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './Advertisements.module.scss'
import { Search, filterBySearch } from '@/features/advertisement-search'
import { useQueryParams } from '@/shared/lib/useQueryParams'
import { useAdvertisements, advertisementColumns } from '@/entities/advertisement'
import { List } from '@/widgets/list'
import { Filter } from '@/features/advertisement-filter'
import type { AdvertisementFilterField, IAdvertisementsParams } from '@/entities/advertisement/model/types'
import type { Advertisement } from '@/entities/advertisement'
import { useMemo } from 'react'

const Advertisements = () => {
    const navigate = useNavigate()
    const { getParam } = useQueryParams()

    // TODO: проводить проверку
    const page = Number(getParam("page")) || 1
    const perPage = Number(getParam("perPage")) || 10
    const sortField = getParam("sortField") || ""
    const sortType = getParam("sortType") || ""
    const q = getParam("q").trim()
    const filterType = getParam("filterType")
    const fromParam = getParam("from")
    const toParam = getParam("to")

    const isValidFilterField = (value: string): value is AdvertisementFilterField => {
        return value === 'price' || value === 'views' || value === 'likes'
    }

    const from = fromParam ? Number(fromParam) : undefined
    const to = toParam ? Number(toParam) : undefined

    const params: IAdvertisementsParams = {
        page,
        perPage,
        sortField,
        sortType,
        q: q || undefined,
        filterField: isValidFilterField(filterType) ? filterType : undefined,
        from: Number.isNaN(from) ? undefined : from,
        to: Number.isNaN(to) ? undefined : to,
    }

    const { data: advertisements, isLoading, error } = useAdvertisements(params)

    // не работает серверный поиск ?name_content=q
    const searchedAdvertisements = useMemo(() => {
        if (!advertisements) return []
        return filterBySearch(advertisements.data, q)
    }, [advertisements, q])

    console.log(advertisements)

    if (error) return (
        <div>Возникла ошибка</div>
    )

    return (
        <>
            <div className={styles.header}>
                <h2 className={styles.title}>Список товаров</h2>
                <Button type='primary'>Добавить товар</Button>
            </div>
            <div className={styles.filtersContainer}>
                <div className={styles.search}>
                    <Search />
                </div>
                <Filter />
            </div>
            {isLoading
                ? <div>Загрузка...</div>
                : searchedAdvertisements
                    ? <List<Advertisement>
                        columns={advertisementColumns}
                        items={searchedAdvertisements}
                        params={params}
                        total={q ? searchedAdvertisements.length :  advertisements?.items}
                        rowKey="id"
                        onRowClick={(record) => navigate(`/advertisements/${record.id}`)}
                    />
                    : <p>Пока пусто</p>
            }
        </>
    )
}

export default Advertisements