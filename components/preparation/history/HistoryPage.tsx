import WPagination from '@components/common/button/WPagination';
import useListHistory from '@hooks/apis/preparation/history/hooks/useListHistory';
import { HistoryFilterContext } from '@hooks/contexts/filters/HistoryFilterContext';
import { Stack } from '@mui/material';
import { useContext, useEffect } from 'react';
import HistoryFilter from './modules/HistoryFilter';
import HistoryStatusNoti from './modules/HistoryStatusNoti';
import HistoryTable from './modules/HistoryTable';

const HistoryPage = () => {
  const { filter, date, setInFilter } = useContext(HistoryFilterContext);
  const { historyListData, totalPages } = useListHistory({ filter, date });

  const pagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setInFilter(value, 'page');
  };

  return (
    <Stack gap="20px">
      <Stack gap="10px">
        <HistoryStatusNoti />
        <HistoryFilter />
      </Stack>
      <HistoryTable data={historyListData} />
      <WPagination
        paddingTop="4px"
        page={filter.page}
        pagination={pagination}
        count={totalPages}
      />
    </Stack>
  );
};

export default HistoryPage;
