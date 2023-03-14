import {
  FilterHistoryType,
  FilterDateType,
  FilterListData,
} from '@hooks/contexts/filters/type';

export const HISTORYLIST = (props: FilterListData) => [
  'HISTORY',
  'LIST',
  { ...props.filter, ...props.date },
];

export const PREPARATIONREQUEST = (id: string) => [
  'PREPARATION',
  'REQUEST',
  { id },
];

export const PRESCRIPTION = (id: string) => ['PRESCRIPTION', 'HISTORY', { id }];

export const RECEPTION_STATUS = () => ['RECEPTION', 'STATUS'];

export const HISTORYSTATUS = () => ['HISTORY', 'STATUS'];
