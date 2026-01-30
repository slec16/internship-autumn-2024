import { useMemo, useEffect } from 'react'
import { Button, Select } from 'antd'
import styles from './Advertisements.module.scss'
import {Search, filterBySearch} from '@/features/advertisement-search'
import { useQueryParams } from '@/shared/lib/useQueryParams'
import { SortAscendingOutlined } from '@ant-design/icons'
import { useAdvertisements } from '@/entities/advertisement'
import List from '@/widgets/advertisements-list'
import {Filter, filterByParams} from '@/features/advertisement-filter'

const Advertisements = () => {
    const { searchParams, setSearchParams } = useQueryParams()
    const { data: advertisements, isLoading, error } = useAdvertisements()

    const filteredAdvertisements = useMemo(() => {
        if( !advertisements ) return []

        let result = filterByParams(advertisements, searchParams)
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
                ? <List items={filteredAdvertisements}/>
                : <p>Пока пусто</p>
            }
        </div>
    )
}

export default Advertisements