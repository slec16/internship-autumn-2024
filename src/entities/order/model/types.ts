import type { Advertisement } from "@/entities/advertisement";

const OrderStatus = {
    Created: 0,
    Paid: 1,
    Transport: 2,
    DeliveredToThePoint: 3,
    Received: 4,
    Archived: 5,
    Refund: 6
} as const;

export const statusToText: Record<number, string> = {
    0: 'Создан',
    1: 'Оплачен',
    2: 'Транспортировка',
    3: 'Доставка до пункта выдачи',
    4: 'Получено',
    5: 'Архив',
    6: 'Отказ'
}
                        

export interface OrderItem extends Advertisement {
    count: number
}

export interface Order {
    /* Уникальный идентификатор. */
    id: string;
    /* Статус. */
    status: typeof OrderStatus[keyof typeof OrderStatus];
    /* Дата и время создания. */
    createdAt: string;
    /* Дата и время завершения. */
    finishedAt?: string;
    /* Товары в заказе. */
    items: Array<OrderItem>;
    /* Способ доставки(Почта, СДЭК...) */
    deliveryWay: string;
    /* Сумма заказа */
    total: number;
}

export interface IOrdersParams {
    page: number,
    perPage: number,
    sortType: string,
    sortField: string,
    status?: number,
    from?: number,
    to?: number,
}

export interface IOrdersResponse {
    data: Order[],
    first: number,
    prev: null | number,
    next: null | number,
    last: number,
    pages: number,
    items: number,
}