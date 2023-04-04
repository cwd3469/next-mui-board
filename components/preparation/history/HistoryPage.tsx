import WPagination from '@components/common/button/WPagination';
import useListHistory from '@hooks/apis/preparation/history/hooks/useListHistory';
import { HistoryFilterContext } from '@hooks/contexts/filters/HistoryFilterContext';
import { Stack } from '@mui/material';
import { useContext } from 'react';
import HistoryFilter from './modules/HistoryFilter';
import HistoryStatusNoti from './modules/HistoryStatusNoti';
import HistoryTable from './modules/HistoryTable';
import { loadingErrorFallbackList } from '@components/common/api/LoadingErrorFallback';

const HistoryPage = () => {
  const { filter, setInFilter } = useContext(HistoryFilterContext);
  const { data, isError, isLoading, isWarning } = useListHistory();

  const pagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setInFilter(value - 1, 'page');
  };

  const info = loadingErrorFallbackList({
    data: data,
    isError: isError,
    isLoading: isLoading,
    isWarning: isWarning,
  });

  return (
    <Stack gap="20px">
      <Stack gap="10px">
        <HistoryStatusNoti
          totalDeliveryPrepareCount={info.totalDeliveryPrepareCount}
          totalMedicineCompleteCount={info.totalMedicineCompleteCount}
          totalMedicineCost={info.totalMedicineCost}
        />
        <HistoryFilter />
      </Stack>
      <HistoryTable data={info.contents} />
      <WPagination
        paddingTop="4px"
        page={filter.page + 1}
        pagination={pagination}
        count={info.totalPages}
      />
    </Stack>
  );
};

export default HistoryPage;
