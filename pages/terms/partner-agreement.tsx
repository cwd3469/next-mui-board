import LoadingErrorFallback from '@components/common/api/LoadingErrorFallback';
import { WLayout } from '@components/common/layouts/WLayout';
import { Gnb } from '@components/common/layouts/gnb/Gnb';
import { useTermsPartnerAgreement } from '@hooks/apis/myinfo/hooks/useTerms';
import { Box } from '@mui/material';

const PartnerAgreement = () => {
  const { data, isError, isLoading, isWarning } = useTermsPartnerAgreement();
  return (
    <div>
      <Gnb />
      <WLayout>
        <LoadingErrorFallback
          isError={isError}
          isLoading={isLoading}
          isWarning={isWarning}
          contexts={
            <>
              <Box />
            </>
          }
        />
      </WLayout>
    </div>
  );
};

export default PartnerAgreement;
