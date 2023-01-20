import { FilterListData } from '@hooks/contexts/filters/type';
import { transQueryDate, transQueryUrl } from '@utils/transtext';
import { getCookie } from 'cookies-next';
import instance from '../../instance';

/** 공지사항 목록
 * GET API
 */
export const apiHistoryList = (prams: FilterListData) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  const queryUrl = transQueryUrl(prams.filter);

  return instance({
    method: 'get',
    url: `apiPreparationHistoryList/url?size=10${queryUrl}`,
    headers: {
      Authorization: accessToken,
    },
  });
};
