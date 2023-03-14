import { UserInfoInterface } from '@components/auth/types';
import { apiTokenValidation } from '@hooks/apis/auth/common';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useMutation } from 'react-query';

interface UserInfoContext {
  userInfo?: UserInfoInterface;
  setInUserInfo?: (info: UserInfoInterface) => void;
  handleTokenInfo?: () => void;
  deleteToken?: () => void;
  signOut?: () => void;
}

const UserInfoContext = createContext<UserInfoContext>({});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const UserInfoProvider = ({ children }: Props): JSX.Element => {
  const router = useRouter();
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const { mutate: mutateTokenValidation } = useMutation(apiTokenValidation);
  const [userInfo, setUserInfo] = useState<UserInfoInterface>();

  /**UserInfoContext 회원가입 라우팅 기능  */
  const signinPageRoute = useCallback(() => {
    if (router.pathname !== '/signin') {
      router.replace(`/signin`, undefined, {
        shallow: true,
      });
    }
  }, [router]);

  /**UserInfoContext 토큰 삭제 */
  const deleteToken = useCallback(() => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    deleteCookie('permission');
    setCookie('authorized', false);
  }, []);

  /**UserInfoContext 로그아웃  */
  const signOut = useCallback(() => {
    deleteToken();
    signinPageRoute();
  }, [deleteToken, signinPageRoute]);

  /**UserInfoContext 토큰 정보 업데이트 */
  const setInUserInfo = useCallback((info: UserInfoInterface) => {
    setUserInfo(info);
  }, []);

  /**UserInfoContext 토큰 리프레쉬 */
  const handleTokenInfo = useCallback(() => {
    const token = getCookie('refreshToken');
    const refreshToken = typeof token === 'string' ? token : '';
    mutateTokenValidation(refreshToken, {
      onSuccess(data, variables, context) {
        if (data.data.code) {
          if (data.data.code !== '0000') {
            if (data.data.code === '0049') {
              toast?.on(
                '다른 기기에서 로그인 하였습니다. \n 로그인 페이지로 이동합니다.',
                'info',
              );
              return;
            } else {
              toast?.on(msg.errMsg(data.data.code), 'error');
            }
            deleteCookie('accessToken');
            deleteCookie('refreshToken');
            signOut();
            return;
          } else {
            setCookie('accessToken', data.data.accessToken);
            setCookie('refreshToken', data.data.refreshToken);
          }
        }
      },
      onError(error, variables, context) {
        toast?.on(
          '토큰 유효기간이 만료 되었습니다. \n 로그인 페이지로 이동합니다.',
          'error',
        );
        signOut();
      },
    });
  }, [msg, mutateTokenValidation, signOut, toast]);

  useEffect(() => {
    if (router.pathname !== '/signin') {
      if (router.pathname !== '/404') {
        if (router.pathname !== '/error') {
          const cookie = getCookie('accessToken');
          if (cookie) {
            const userinfo: UserInfoInterface = jwtDecode(cookie as string);
            setUserInfo(userinfo);
            return;
          }
          signinPageRoute();
          toast?.on(
            '로그인 상태가 아닙니다 \n 로그인 페이지로 이동합니다.',
            'error',
          );
        }
      }
    }
  }, [router.pathname, signinPageRoute, toast]);

  const value = {
    userInfo,
    setInUserInfo,
    handleTokenInfo,
    deleteToken,
    signOut,
  };

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
};

export { UserInfoContext, UserInfoProvider };
