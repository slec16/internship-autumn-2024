import styles from "./ModalOrder.module.scss"
import { Order, statusToText } from "../model/types"


const ModalOrder = ({ order }: { order: Order | null }) => {

    console.log(order)


    if (!order) return (
        <div>
            Заказ не найден
        </div>
    )

    return (
        <div>
            <div className={styles.modalHeader}>
                <p>{statusToText[order.status]}</p>
                <p>{order.deliveryWay}</p>
                <p>{order.total.toLocaleString("ru-RU")} ₽</p>
            </div>
            <div className={styles.itemsList}>
                {order.items.map(el => {
                    return (
                        <div>
                            <img
                                src={el.imageUrl}
                            />
                            <div className={styles.gridItem}>
                                <div className={styles.field}>
                                    <span className={styles.label}>Название</span>
                                    <span className={styles.value}>{el.name}</span>
                                </div>
                                <div className={styles.field}>
                                    <span className={styles.label}>Количество</span>
                                    <span className={styles.value}>{el.count}</span>
                                </div>
                                <div className={styles.field}>
                                    <span className={styles.label}>Цена</span>
                                    <span className={styles.value}>{el.price}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ModalOrder