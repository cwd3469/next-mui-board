import WStatusNoti, {
  WNotiBox,
} from '@components/common/typography/WStatusNoti';
import { Grid } from '@mui/material';

const ProceedStatusNoti = (props: {
  totalInPrepareCount?: number;
  totalOutstandingCount?: number;
}) => {
  return (
    <Grid container gap="16px" alignItems="center">
      <WStatusNoti
        counting={String(props.totalInPrepareCount)}
        title="현제 조제 중 건수"
        units="건"
      />
      <WNotiBox />
      <WStatusNoti
        counting={String(props.totalOutstandingCount)}
        title="현제 결제 대기 건수"
        units="건"
      />
    </Grid>
  );
};

export default ProceedStatusNoti;
