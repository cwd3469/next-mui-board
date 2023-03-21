import { useEffect } from 'react';

interface LoadingErrorFallbackProps {
  isLoading: boolean;
  isError: boolean;
  isWarning: boolean;
  skeleton?: JSX.Element | JSX.Element | string;
  contexts: JSX.Element | JSX.Element | string;
}
const LoadingErrorFallback = (props: LoadingErrorFallbackProps) => {
  const { isError, isLoading, isWarning, skeleton, contexts } = props;

  if (isLoading) {
    return <>{skeleton ? skeleton : <></>}</>;
  }
  if (isError) {
    return <>{skeleton ? skeleton : <></>}</>;
  }
  if (isWarning) {
    return <>{skeleton ? skeleton : <></>}</>;
  }
  return <>{contexts}</>;
};

export default LoadingErrorFallback;
