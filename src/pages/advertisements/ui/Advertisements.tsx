import { useMemo } from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './Advertisements.module.scss'
import { Search, filterBySearch } from '@/features/advertisement-search'
import { useQueryParams } from '@/shared/lib/useQueryParams'
import { useAdvertisements, advertisementColumns } from '@/entities/advertisement'
import { List } from '@/widgets/list'
import { Filter, filterByParams } from '@/features/advertisement-filter'
import type { IAdvertisementsParams } from '@/entities/advertisement/model/types'
import type { Advertisement } from '@/entities/advertisement'

const Advertisements = () => {
    const navigate = useNavigate()
    const { getParam, searchParams } = useQueryParams()

    // TODO: проводить проверку
    const page = Number(getParam("page")) || 1
    const perPage = Number(getParam("perPage")) || 10
    const sortField = getParam("sortField") || ""
    const sortType = getParam("sortType") || ""
    
    const params: IAdvertisementsParams = {
        page,
        perPage,
        sortField,
        sortType,
    }
    
    const { data: advertisements, isLoading, error } = useAdvertisements(params)

    const filteredAdvertisements = useMemo(() => {
        if( !advertisements ) return []

        let result = filterByParams(advertisements.data, searchParams)
        result = filterBySearch(result, searchParams)
        
        return result
    }, [advertisements, searchParams])

    if( isLoading ) return(
        <div>Загрузка...</div>
    )

    if( error ) return(
        <div>Возникла ошибка</div>
    )

    return (
        <>
            <div className={styles.header}>
                <h2 className={styles.title}>Список товаров {filteredAdvertisements.length}</h2>
                <Button type='primary'>Добавить товар</Button>
            </div>
            <div className={styles.filtersContainer}>
                <div className={styles.search}>
                    <Search />
                </div>
                <Filter />
            </div>
            { filteredAdvertisements
                ? <List<Advertisement>
                    columns={advertisementColumns}
                    items={filteredAdvertisements}
                    params={params}
                    total={advertisements?.items}
                    rowKey="id"
                    onRowClick={(record) => navigate(`/advertisements/${record.id}`)}
                  />
                : <p>Пока пусто</p>
            }
        </>
    )
}

export default Advertisements