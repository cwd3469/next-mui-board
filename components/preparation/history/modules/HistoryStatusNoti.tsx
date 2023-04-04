import WStatusNoti, {
  WNotiBox,
} from '@components/common/typography/WStatusNoti';
import { Grid } from '@mui/material';
import { commaAdd } from '@utils/formatNumber';

const HistoryStatusNoti = (props: {
  totalDeliveryPrepareCount: number;
  totalMedicineCompleteCount: number;
  totalMedicineCost: number;
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
        counting={commaAdd(String(props.totalMedicineCost))}
        title="오늘의 총 조제비"
        units="원"
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
