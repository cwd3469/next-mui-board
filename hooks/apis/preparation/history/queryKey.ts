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
