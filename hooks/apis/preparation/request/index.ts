import { FilterListData } from '@hooks/contexts/filters/type';
import { transQueryDate, transQueryUrl } from '@utils/transtext';
import { getCookie } from 'cookies-next';
import instance from '../../instance';

/** 조제 진행 목록
 * GET API
 */
export const apiProceedList = (prams: FilterListData) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  const queryUrl = transQueryUrl(prams.filter);

  return instance({
    method: 'get',
    url: `apiPreparationProceedList/url?size=10${queryUrl}`,
    headers: {
      Authorization: accessToken,
    },
  });
};
/** 조제 진행 요청자 정보
 * GET API
 */
export const apiProceedPreparationRequest = (prams: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `apiProceedPreparationRequest/${prams}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 조제 진행 처방전 정보
 * GET API
 */
export const apiProceedPrescription = (prams: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `apiProceedPrescription/${prams}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 조제 진행 상태 알림
 * GET API
 */
export const apiProceedNoti = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `apiProceed/noti`,
    headers: {
      Authorization: accessToken,
    },
  });
};
/** 조제 진행 상태 알림
 * GET API
 */
export const apiDispensingAccept = (text: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  const dto = {
    dispensingExpenses: text,
  };

  return instance({
    method: 'get',
    url: `apiDispensingExpenses/noti`,
    data: dto,
    headers: {
      Authorization: accessToken,
    },
  });
};
