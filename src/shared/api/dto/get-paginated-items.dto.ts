export interface IGetPaginatedItemsQueryParams {
  limit: number;
  offset: number;
}

export interface IGetPaginatedItemsResponseDto<T> {
  totalCount: number;
  items: T[];
}
