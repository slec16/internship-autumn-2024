import styles from "./ItemsPreview.module.scss"
import type { Advertisement } from "@/entities/advertisement"
import { Image } from "antd"

const ItemsPreview = ({ items }: { items: Advertisement[] }) => {
    const previewItems = items.slice(0, 3)

    return (
        <div className={styles.previewGrid}>
            {previewItems.map((item) => (
                <div key={item.id} className={styles.previewCell}>
                    {item.imageUrl
                        ? (
                            <Image
                                src={item.imageUrl}
                                alt="Товар"
                                width="100%"
                                height="100%"
                                preview={false}
                                className={styles.previewImage}
                            />
                        )
                        : (
                            <div className={styles.emptyImage}>
                                Нет фото
                            </div>
                        )
                    }
                </div>
            ))}
            {items.length >= 4 &&
                <div className={`${styles.previewCell} ${styles.counterBox}`}>
                    <p className={styles.counterText}>+{items.length - 3}</p>
                </div>
            }
        </div>
    )

}

export default ItemsPreview

