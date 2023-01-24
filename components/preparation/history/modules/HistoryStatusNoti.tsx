import WStatusNoti, {
  WNotiBox,
} from '@components/common/typography/WStatusNoti';
import useQueryHistoryNoti from '@hooks/apis/preparation/history/hooks/useQueryHistoryNoti';
import { Box, Grid } from '@mui/material';
import { commaAdd, mobileFormat } from '@utils/formatNumber';

const HistoryStatusNoti = () => {
  const { data } = useQueryHistoryNoti();

  return (
    <Grid container gap="16px" alignItems="center">
      <WStatusNoti
        counting={String(data.completedNumber)}
        title="오늘의 조제 완료 건수"
        units="건"
      />
      <WNotiBox />
      <WStatusNoti
        counting={commaAdd(String(data.totalCost))}
        title="오늘의 총 조제비"
        units="원"
      />
      <WNotiBox />
      <WStatusNoti
        counting={String(data.currentDeliveryNumber)}
        title="현제 배송 접수 전"
        units="건"
      />
    </Grid>
  );
};

export default HistoryStatusNoti;
