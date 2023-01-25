import WStatusNoti, {
  WNotiBox,
} from '@components/common/typography/WStatusNoti';
import useQueryRequestNoti from '@hooks/apis/preparation/request/hooks/useQueryRequestNoti';
import { Box, Grid } from '@mui/material';

const RequestStatusNoti = () => {
  const { data } = useQueryRequestNoti();

  return (
    <Grid container gap="16px" alignItems="center">
      <WStatusNoti
        counting={String(data.currentRequestsNumber)}
        title="현제 조제 요청 건수"
        units="건"
      />
      <WNotiBox />
    </Grid>
  );
};

export default RequestStatusNoti;
