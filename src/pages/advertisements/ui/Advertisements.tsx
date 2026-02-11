import { useMemo, useEffect } from 'react'
import { Button, Select } from 'antd'
import styles from './Advertisements.module.scss'
import {Search, filterBySearch} from '@/features/advertisement-search'
import { useQueryParams } from '@/shared/lib/useQueryParams'
import { SortAscendingOutlined } from '@ant-design/icons'
import { useAdvertisements } from '@/entities/advertisement'
import List from '@/widgets/advertisements-list'
import {Filter, filterByParams} from '@/features/advertisement-filter'
import type { IAdvertisementsParams } from '@/entities/advertisement/model/types'

const Advertisements = () => {
    const { getParam, searchParams, setSearchParams } = useQueryParams()

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

    console.log("adver res",advertisements)

    if( isLoading ) return(
        <div>Загрузка...</div>
    )

    if( error ) return(
        <div>Возникла ошибка</div>
    )

    return (
        <div >
            <div className={styles.header}>
                {/* <h2 className={styles.title}>Список товаров</h2> */}
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
                ? <List items={filteredAdvertisements} params={params} total={advertisements?.items}/>
                : <p>Пока пусто</p>
            }
        </div>
    )
}

export default Advertisements