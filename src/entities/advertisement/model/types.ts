export interface Advertisement {
    /* Уникальный идентификатор. */
    id: string;
    /* Название. */
    name: string;
    /* Описание. */
    description?: string;
    /* Цена. */
    price: number;
    /* Дата и время создания. */
    createdAt: string;
    /* Количество просмотров. */
    views: number;
    /* Количество лайков. */
    likes: number;
    /* Ссылка на изображение. */
    imageUrl?: string;
}

export interface IAdvertisementsParams {
    page: number,
    perPage: number,
    sortType: string,
    sortField: string
}

export interface IAdvertisementsResponse {
    data: Advertisement[],
    first: number,
    prev: null | number,
    next: null | number,
    last: number,
    pages: number,
    items: number,
}

