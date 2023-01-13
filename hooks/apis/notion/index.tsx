import { FilterNoticeType } from '@hooks/contexts/filters/type';
import { transQueryDate, transQueryUrl } from '@utils/transtext';
import { getCookie } from 'cookies-next';
import instance from '../instance';

/** 공지사항 목록
 * GET API
 */
export const apiNoticeList = (prams: { filter: FilterNoticeType }) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  const queryUrl = transQueryUrl(prams.filter);

  return instance({
    method: 'get',
    url: `url?size=10${queryUrl}`,
    headers: {
      Authorization: accessToken,
    },
  });
};
/** 공지사항 상세
 * GET API
 */
export const apiNoticeDetail = (prams: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `url/detail/${prams}`,
    headers: {
      Authorization: accessToken,
    },
  });
};
