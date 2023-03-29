import { getCookie } from 'cookies-next';
import instance from '../../instance';

/** 조제 진행 목록
 * GET API
 */
export const apiProceedList = (queryUrl: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `pharmacy/api/v2/medicines/orders/requests?size=10${queryUrl}`,
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

/** 조제 상태 조회 GET API */
export const apiPrepareReceptionStatus = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  //TODO:api url 변경 점
  return instance({
    method: 'get',
    url: `/pharmacy/api/v2/pharmacy/status`,
    headers: {
      Authorization: accessToken,
    },
  });
};
/** 조제 상태 변경 open PUT API */
export const apiPrepareReceptionStatusOpen = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  //TODO:api url 변경 점
  return instance({
    method: 'put',
    url: `/pharmacy/api/v2/pharmacy/open`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 조제 상태 변경 close PUT API */
export const apiPrepareReceptionStatusClose = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  //TODO:api url 변경 점
  return instance({
    method: 'put',
    url: `/pharmacy/api/v2/pharmacy/close`,
    headers: {
      Authorization: accessToken,
    },
  });
};
