import instance from '@hooks/apis/instance';
import { getCookie } from 'cookies-next';

/** 영업시간 설정
 * GET API
 */
export const apiBusinesssSet = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `url/business/setting`,
    headers: {
      Authorization: accessToken,
    },
  });
};
