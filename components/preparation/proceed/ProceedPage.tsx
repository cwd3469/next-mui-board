import WPagination from '@components/common/button/WPagination';
import useListProceed from '@hooks/apis/preparation/proceed/hooks/useListProceed';
import { ProceedFilterContext } from '@hooks/contexts/filters/ProceedFilterContext';
import { Stack } from '@mui/material';
import { useContext } from 'react';
import ProceedFilter from './modules/ProceedFilter';
import ProceedStatusNoti from './modules/ProceedStatusNoti';
import ProceedTable from './modules/ProceedTable';

const ProceedPage = () => {
  const { filter, date, setInFilter } = useContext(ProceedFilterContext);
  const { listData, totalPages } = useListProceed({ filter, date });

  const pagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setInFilter(value, 'page');
  };

  return (
    <Stack gap="20px">
      <Stack gap="10px">
        <ProceedStatusNoti />
        <ProceedFilter />
      </Stack>
      <ProceedTable data={listData} />
      <WPagination
        paddingTop="4px"
        page={filter.page}
        pagination={pagination}
        count={totalPages}
      />
    </Stack>
  );
};

export default ProceedPage;
