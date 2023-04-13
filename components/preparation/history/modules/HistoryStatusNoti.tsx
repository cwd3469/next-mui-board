import WStatusNoti, {
  WNotiBox,
} from '@components/common/typography/WStatusNoti';
import { Grid } from '@mui/material';
import { commaAdd } from '@utils/formatNumber';

const HistoryStatusNoti = (props: {
  totalDeliveryPrepareCount: number;
  totalMedicineCompleteCount: number;
}) => {
  return (
    <Grid container gap="16px" alignItems="center">
      <WStatusNoti
        counting={String(props.totalMedicineCompleteCount)}
        title="오늘의 조제 완료 건수"
        units="건"
      />
      <WNotiBox />
      <WStatusNoti
        counting={String(props.totalDeliveryPrepareCount)}
        title="현제 배송 접수 전"
        units="건"
      />
    </Grid>
  );
};

export default HistoryStatusNoti;
