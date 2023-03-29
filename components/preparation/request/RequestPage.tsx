import WPagination from '@components/common/button/WPagination';
import useListRequest from '@hooks/apis/preparation/request/hooks/useListRequest';
import { RequestFilterContext } from '@hooks/contexts/filters/RequestFilterContext';
import { Stack } from '@mui/material';
import { useContext } from 'react';
import RequestFilter from './modules/RequestFilter';
import RequestStatusNoti from './modules/RequestStatusNoti';
import RequestTable from './modules/RequestTable';
import LoadingErrorFallback from '@components/common/api/LoadingErrorFallback';
import { useRouter } from 'next/router';

const RequestPage = () => {
  const { filter, setInFilter } = useContext(RequestFilterContext);
  const router = useRouter();

  const { data, isError, isLoading, isWarning } = useListRequest(router.query);

  const pagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setInFilter(value, 'page');
  };

  return (
    <Stack gap="10px">
      <LoadingErrorFallback
        data={data}
        isError={isError}
        isLoading={isLoading}
        isWarning={isWarning}
        contexts={(info) => {
          return (
            <>
              <Stack gap="10px">
                <RequestStatusNoti
                  totalElements={info.data.data.page.totalElements}
                />
                <RequestFilter />
              </Stack>
              <RequestTable data={info.data.data.page.content} />
              <WPagination
                page={filter.page + 1}
                pagination={pagination}
                count={info.data.data.page.totalPages}
              />
            </>
          );
        }}
      />
    </Stack>
  );
};

export default RequestPage;
