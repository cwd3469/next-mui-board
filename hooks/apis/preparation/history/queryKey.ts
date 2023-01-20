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
