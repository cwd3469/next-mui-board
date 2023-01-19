import { AuthMobileNumber, AuthNumberChack } from '@components/auth/types';
import instance from '@hooks/apis/instance';

/**공용 / 모바일 점유 인증 api */
export const apiCommonMobileAuth = (prams: AuthMobileNumber) => {
  return instance({
    method: 'post',
    url: `/auth/api/v1/mobile-authentication`,
    data: prams,
  });
};

/**공용 / 점유 인증 확인 api */
export const apiCommonAuthCheck = (prams: AuthNumberChack) => {
  return instance({
    method: 'post',
    url: `/auth/api/v1/mobile-authentication/verify`,
    data: prams,
  });
};
