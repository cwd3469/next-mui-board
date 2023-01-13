import { FilterNoticeType } from '@hooks/contexts/filters/type';

export const NOTICELIST = (filter: FilterNoticeType) => [
  'NOTICE',
  'LIST',
  { ...filter },
];
export const NOTICEDETAIL = (ulid: string) => ['NOTICE', 'DETAIL', ulid];
