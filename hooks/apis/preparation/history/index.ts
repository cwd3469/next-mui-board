import { FilterListData } from '@hooks/contexts/filters/type';
import { transQueryDate, transQueryUrl } from '@utils/transtext';
import { getCookie } from 'cookies-next';
import instance from '../../instance';

/** 조제 내역 목록
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
/** 조제 내역 요청자 정보
 * GET API
 */
export const apiHistoryPreparationRequest = (prams: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `apiHistoryPreparationRequest/${prams}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 조제 내역 처방전 정보
 * GET API
 */
export const apiHistoryPrescription = (prams: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `apiHistoryPrescription/${prams}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 조제 내역 배송요청
 * GET API
 */
export const apiDeliveryRequest = (prams: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `apiDeliveryRequest/${prams}`,
    headers: {
      Authorization: accessToken,
    },
  });
};
