export type FilterValue =
  | string
  | number
  | FilterDateType
  | undefined
  | boolean;

export interface DataPagition {
  [key: string]: FilterValue;
  code?: string;
  keyword?: string;
  page: number;
}

export interface FilterNoticeType extends DataPagition {
  status?: string;
}

export interface FilterDateType {
  [key: string]: string;
  startDate: string;
  endDate: string;
}

export type FilterAllOtions = DataPagition | FilterNoticeType;
