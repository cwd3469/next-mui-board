import { FilterNoticeType } from '@hooks/contexts/filters/type';

export const NOTICELIST = (filter: FilterNoticeType) => [
  'NOTICE',
  'LIST',
  { ...filter },
];
