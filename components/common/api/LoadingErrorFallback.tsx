/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';

interface LoadingErrorFallbackProps {
  isLoading: boolean;
  isError: boolean;
  isWarning: boolean;
  skeleton?: JSX.Element | JSX.Element | string;
  contexts: (
    info: AxiosResponse<any, any>,
  ) => JSX.Element | JSX.Element | string;
  data: AxiosResponse<any, any> | undefined;
}
const LoadingErrorFallback = (props: LoadingErrorFallbackProps) => {
  const { data, isError, isLoading, isWarning, skeleton, contexts } = props;

  if (isLoading) {
    return <>{skeleton ? skeleton : <>isLoading...</>}</>;
  }
  if (isError) {
    return <>{skeleton ? skeleton : <>isError...</>}</>;
  }
  if (isWarning) {
    return <>{skeleton ? skeleton : <>isLoading...</>}</>;
  }
  if (data) {
    if (data.data.code === '0000') {
      return <>{contexts(data)}</>;
    }
    return <>{skeleton ? skeleton : <></>}</>;
  }
  return <>{skeleton ? skeleton : <></>}</>;
};

export default LoadingErrorFallback;
