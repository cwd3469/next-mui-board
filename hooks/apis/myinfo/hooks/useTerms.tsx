import { useQuery } from 'react-query';
import {
  apiPrivacyUsageAgreement,
  apiPrivacyPolicy,
  apiPartnerAgreement,
} from '..';
import { MYINFO_PRIVACY, MYINFO_POLICY, MYINFO_PARTNER } from '../queryKey';
import useCodeWarningEffect from '@hooks/utils/useCodeWarningEffect';

//개인정보 처리에 관한 동의서
const useTermsPrivacyAgreement = () => {
  const { data, isError, isLoading } = useQuery(MYINFO_PRIVACY, async () => {
    return await apiPrivacyUsageAgreement();
  });
  const code = data?.data.code;
  const { isWarning } = useCodeWarningEffect({ code: code });
  return { data, isError, isLoading, isWarning };
};

//파트너 개인정보 보호 의무 동의
const useTermsPrivacyPolicy = () => {
  const { data, isError, isLoading } = useQuery(MYINFO_POLICY, async () => {
    return await apiPrivacyPolicy();
  });
  const code = data?.data.code;
  const { isWarning } = useCodeWarningEffect({ code: code });
  return { data, isError, isLoading, isWarning };
};

//파트너사 이용약관
const useTermsPartnerAgreement = () => {
  const { data, isError, isLoading } = useQuery(MYINFO_PARTNER, async () => {
    return await apiPartnerAgreement();
  });
  const code = data?.data.code;
  const { isWarning } = useCodeWarningEffect({ code: code });
  return { data, isError, isLoading, isWarning };
};

export {
  useTermsPrivacyAgreement,
  useTermsPrivacyPolicy,
  useTermsPartnerAgreement,
};
