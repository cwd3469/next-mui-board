import WPagination from '@components/common/button/WPagination';
import useListRequest from '@hooks/apis/preparation/request/hooks/useListRequest';
import { RequestFilterContext } from '@hooks/contexts/filters/RequestFilterContext';
import { Stack } from '@mui/material';
import { useContext } from 'react';
import RequestFilter from './modules/RequestFilter';
import RequestStatusNoti from './modules/RequestStatusNoti';
import RequestTable from './modules/RequestTable';

const RequestPage = () => {
  const { filter, date, setInFilter } = useContext(RequestFilterContext);
  const { listData, totalPages } = useListRequest({ filter, date });

  const pagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setInFilter(value, 'page');
  };

  return (
    <Stack gap="20px">
      <Stack gap="10px">
        <RequestStatusNoti />
        <RequestFilter />
      </Stack>
      <RequestTable data={listData} />
      <WPagination
        paddingTop="4px"
        page={filter.page}
        pagination={pagination}
        count={totalPages}
      />
    </Stack>
  );
};

export default RequestPage;
