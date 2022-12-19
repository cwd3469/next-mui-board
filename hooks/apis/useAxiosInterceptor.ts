import { useToastContext } from '@hooks/utils/useToastContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import instance from './instance';

const useAxiosInterceptor = () => {
  const [progressOn, setProgressOn] = useState<boolean>(false);
  const router = useRouter();
  const toast = useToastContext();
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
