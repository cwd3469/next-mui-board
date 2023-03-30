import WStatusNoti, {
  WNotiBox,
} from '@components/common/typography/WStatusNoti';
import useQueryProceedyNoti from '@hooks/apis/preparation/proceed/hooks/useQueryProceedyNoti';
import { Box, Grid } from '@mui/material';

const ProceedStatusNoti = () => {
  const { data } = useQueryProceedyNoti();

  return (
    <Grid container gap="16px" alignItems="center">
      <WStatusNoti
        counting={String(data.currentRequestsNumber)}
        title="현제 조제 중 건수"
        units="건"
      />
      <WNotiBox />
      <WStatusNoti
        counting={String(data.currentPaymentsNumber)}
        title="현제 결제 대기 건수"
        units="건"
      />
    </Grid>
  );
};

export default ProceedStatusNoti;
