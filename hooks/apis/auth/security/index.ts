import { getCookie } from 'cookies-next';
import instance from '../../instance';

/**보안 설정 조회 api */
export const securityGet = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  return instance({
    method: 'get',
    url: `/auth/api/v2/pharmacy/security-setting`,
    headers: {
      Authorization: accessToken,
    },
  });
};
/**보안 설정 조회 api */
export const securityPut = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  return instance({
    method: 'put',
    url: `/auth/api/v2/pharmacy/security-setting`,
    headers: {
      Authorization: accessToken,
    },
  });
};
