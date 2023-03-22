import WPagination from '@components/common/button/WPagination';
import useNoticeList from '@hooks/apis/notion/hooks/useNotice';
import { NoticeFilterContext } from '@hooks/contexts/filters/NoticeFilterContext';
import { Stack } from '@mui/material';
import { useContext } from 'react';
import NoticeFilter from './modules/NoticeFilter';
import NoticeTable from './modules/NoticeTable';
import LoadingErrorFallback from '@components/common/api/LoadingErrorFallback';

const NoticePage = () => {
  const { filter, setInFilter } = useContext(NoticeFilterContext);
  const { data, isError, isLoading, isWarning } = useNoticeList();
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
              <NoticeFilter />
              <NoticeTable data={info.data.data.page.content} />
              <WPagination
                paddingTop="4px"
                page={filter.page}
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

export default NoticePage;
