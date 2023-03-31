/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import React from 'react';
import { useEffect } from 'react';
interface LoadingErrorProps {
  isLoading: boolean;
  isError: boolean;
  isWarning: boolean;
  data?: AxiosResponse<any, any>;
}

interface LoadingErrorFallbackProps extends LoadingErrorProps {
  skeleton?: JSX.Element | JSX.Element | string;
  contexts: (
    info: AxiosResponse<any, any>,
  ) => JSX.Element | JSX.Element | string;
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
    return <>{skeleton ? skeleton : <>isWarning...</>}</>;
  }
  if (data) {
    if (data.data.code === '0000') {
      return <>{contexts(data)}</>;
    }
    return <>{skeleton ? skeleton : <></>}</>;
  }
  return <>{skeleton ? skeleton : <></>}</>;
};

export const loadingErrorFallbackList = (props: LoadingErrorProps) => {
  const { data, isError, isLoading, isWarning } = props;
  const def = {
    contents: [],
    totalPages: 0,
    totalElements: 0,
  };
  const info = isLoading
    ? def
    : isError
    ? def
    : isWarning
    ? def
    : data
    ? data.data.code === '0000'
      ? {
          contents: data.data.data.page.content,
          totalPages: data.data.data.page.totalPages,
          totalElements: data.data.data.page.totalElements,
        }
      : def
    : def;
  return info;
};

export default React.memo(LoadingErrorFallback);
