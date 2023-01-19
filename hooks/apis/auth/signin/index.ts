import { SigninDto } from '@components/auth/signin/type';
import instance from '../../instance';

/**로그인 api */
export const apiSignin = (info: SigninDto) => {
  return instance({
    method: 'post',
    url: `/auth/api/v2/pharmacy/signin`,
    data: info,
  });
};
