import { useQuery } from 'react-query';
import { SECURITY_SETTING } from '../queryKey';
import { securityGet } from '.';
import useCodeWarningEffect from '@hooks/utils/useCodeWarningEffect';
import { useRouter } from 'next/router';

const useSecurityAuth = () => {
  const { data, isError, isLoading } = useQuery(SECURITY_SETTING, async () => {
    return await securityGet();
  });
  const router = useRouter();
  const code = data?.data.code;

  const { isWarning } = useCodeWarningEffect({
    code: code,
    codeCallBack(code) {
      router.replace('/preparation/history');
    },
  });

  return { data, isError, isLoading, isWarning };
};

export default useSecurityAuth;
