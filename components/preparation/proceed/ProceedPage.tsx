import WPagination from '@components/common/button/WPagination';
import useListProceed from '@hooks/apis/preparation/proceed/hooks/useListProceed';
import { ProceedFilterContext } from '@hooks/contexts/filters/ProceedFilterContext';
import { Stack } from '@mui/material';
import { useContext } from 'react';
import ProceedFilter from './modules/ProceedFilter';
import ProceedStatusNoti from './modules/ProceedStatusNoti';
import ProceedTable from './modules/ProceedTable';
import { useRouter } from 'next/router';
import LoadingErrorFallback from '@components/common/api/LoadingErrorFallback';

const ProceedPage = () => {
  const { filter, setInFilter, date } = useContext(ProceedFilterContext);
  const router = useRouter();
  const { data, isError, isLoading, isWarning } = useListProceed({
    query: router.query,
    date: date,
  });

  const pagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setInFilter(value, 'page');
  };

  return (
    <Stack gap="20px">
      <LoadingErrorFallback
        data={data}
        isError={isError}
        isLoading={isLoading}
        isWarning={isWarning}
        contexts={(info) => {
          return (
            <>
              <Stack gap="10px">
                <ProceedStatusNoti />
                <ProceedFilter />
              </Stack>
              <ProceedTable data={info.data.data.page.content} />
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

export default ProceedPage;
