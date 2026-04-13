import styles from "./ItemsPreview.module.scss"
import type { Advertisement } from "@/entities/advertisement"
import { Image } from "antd"

const ItemsPreview = ({ items }: { items: Advertisement[] }) => {


    return (
        <>
            {items.map((item, index) => {
                if (index < 3) {
                    return (
                        <div >
                            {item.imageUrl
                                ? (
                                    <Image
                                        src={item.imageUrl}
                                        alt="Товар"
                                        width={80}
                                        height={80}
                                        style={{ objectFit: "cover", borderRadius: 8 }}
                                    />
                                )
                                : (
                                    <div
                                        style={{
                                            width: 80,
                                            height: 80,
                                            background: "#d8d8d8",
                                            borderRadius: 8,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#838282"
                                        }}
                                    >
                                        Нет фото
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            })}
            {items.length >= 4 &&
                <div className={styles.counterBox}>
                    <p className={styles.counterText}>+{items.length - 3}</p>
                </div>
            }
        </>
    )

}

export default ItemsPreview

