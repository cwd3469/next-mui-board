import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { apiTokenValidation } from './auth/common';
import instance from './instance';

const useAxiosInterceptor = () => {
  const [progressOn, setProgressOn] = useState<boolean>(false);
  const { mutate: mutateTokenValidation } = useMutation(apiTokenValidation);
  const router = useRouter();
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  useEffect(() => {
    const interceptorReq = instance.interceptors.request.use(
      (config) => {
        setProgressOn(true);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    const interceptor = instance.interceptors.response.use(
      (response) => {
        setProgressOn(false);
        const res = response;
        return res;
      },
      (error) => {
        console.log(error);
        const status = error.response.status;
        if (status === 498) {
          const token = getCookie('refreshToken');
          const refreshToken = typeof token === 'string' ? token : '';
          mutateTokenValidation(refreshToken, {
            onSuccess(data, variables, context) {
              if (data.data.code) {
                if (data.data.code !== '0000') {
                  router.replace('/signin', undefined, {
                    shallow: true,
                  });
                  deleteCookie('accessToken');
                  deleteCookie('refreshToken');
                  toast?.on(msg.errMsg(data.data.code), 'error');
                  return;
                }
              }
              setCookie('accessToken', data.data.accessToken);
              setCookie('refreshToken', data.data.refreshToken);
              return instance(error.config);
            },
          });
        }

        setProgressOn(false);
        return Promise.reject(error);
      },
    );

    return () => {
      instance.interceptors.request.eject(interceptorReq);
      instance.interceptors.response.eject(interceptor);
    };
  }, [router, toast]);

  return progressOn;
};

export default useAxiosInterceptor;
