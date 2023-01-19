import WPagination from '@components/common/button/WPagination';
import useNoticeList from '@hooks/apis/notion/hooks/useNotice';
import { NoticeFilterContext } from '@hooks/contexts/filters/NoticeFilterContext';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { Stack } from '@mui/material';
import { useContext, useEffect } from 'react';
import HistoryFilter from './modules/HistoryFilter';
import HistoryTable from './modules/HistoryTable';
import { HistoryInterface } from './type';

const HistoryPage = () => {
  const { filter, setInFilter } = useContext(NoticeFilterContext);
  const { noticeData, totalPages } = useNoticeList(filter);

  const pagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setInFilter(value, 'page');
  };
  return (
    <Stack gap="20px">
      <HistoryFilter />
      <HistoryTable data={noticeData} />
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
