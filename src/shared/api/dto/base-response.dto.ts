export interface IBaseResponseDto<T> {
  data: T;
  errors: string[];
  status: number;
}
