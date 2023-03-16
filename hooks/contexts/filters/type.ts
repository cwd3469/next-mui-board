export type FilterValue =
  | string
  | number
  | FilterDateType
  | undefined
  | boolean;

export interface DataPagition {
  [key: string]: FilterValue;
  keyword?: string;
  page: number;
}

export interface FilterNoticeType extends DataPagition {
  type?: string;
  title?: string;
}
export interface FilterHistoryType extends DataPagition {
  preparationStatus?: string;
  deliveryStatus?: string;
}
export interface FilterProceedType extends DataPagition {
  paymentStatus?: string;
}

export interface FilterDateType {
  [key: string]: string;
  startDate: string;
  endDate: string;
}

export type FilterAllOtions =
  | DataPagition
  | FilterNoticeType
  | FilterHistoryType
  | FilterProceedType;

export type FilterListData = {
  filter: FilterAllOtions;
  date: FilterDateType;
};
