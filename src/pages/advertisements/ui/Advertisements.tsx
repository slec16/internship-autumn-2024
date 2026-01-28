import { Button, Select } from 'antd'
import styles from './Advertisements.module.scss'
import Search from '@/features/advertisement-search'
import { SortAscendingOutlined } from '@ant-design/icons'
import { useAdvertisements } from '@/entities/advertisement'
import List from '@/widgets/advertisements-list'

const Advertisements = () => {

    const { data: advertisements, isLoading, error } = useAdvertisements()    

    const handleChange = (val: string) => {
        console.log(val)
    }

    if( isLoading ) return(
        <div>Загрузка...</div>
    )

    if( error ) return(
        <div>Возникла ошибка</div>
    )

    return (
        <div >
            <div className={styles.header}>
                <h2 className={styles.title}>Список товаров</h2>
                <Button type='primary'>Добавить товар</Button>
            </div>
            <div className={styles.filtersContainer}>
                <div className={styles.search}>
                    <Search />
                </div>
                <Select
                    size='large'
                    placeholder="Фильтры"
                    style={{ width: 200, marginRight: 10 }}
                    allowClear
                    onChange={handleChange}
                    options={[
                        { value: 'price', label: 'Цена' },
                        { value: 'views', label: 'Просмотры' },
                        { value: 'likes', label: 'Лайки' },
                    ]}
                />
                <Select
                    size='large'
                    placeholder="Сортировка"
                    prefix={<SortAscendingOutlined />}
                    style={{ width: 200 }}
                    allowClear
                    onChange={handleChange}
                    options={[
                        { value: 'name', label: 'Имя' },
                        { value: 'price', label: 'Цена' },
                        { value: 'createdAt', label: 'Дата создания' },
                        { value: 'views', label: 'Просмотры' },
                        { value: 'likes', label: 'Лайки' },
                    ]}
                />
            </div>
            { advertisements
                ? <List items={advertisements}/>
                : <p>Пока пусто</p>
            }
        </div>
    )
}

export default Advertisements