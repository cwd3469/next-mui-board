import WPagination from '@components/common/button/WPagination';
import useNoticeList from '@hooks/apis/notion/hooks/useNotice';
import { NoticeFilterContext } from '@hooks/contexts/filters/NoticeFilterContext';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { Stack } from '@mui/material';
import { useContext, useEffect } from 'react';
import NoticeFilter from './modules/NoticeFilter';
import NoticeTable from './modules/NoticeTable';
import { NoticeInterface } from './type';

const NoticePage = () => {
  const { filter, setInFilter } = useContext(NoticeFilterContext);
  const { noticeData, totalPages } = useNoticeList(filter);

  const pagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setInFilter(value, 'page');
  };
  return (
    <Stack gap="20px">
      <NoticeFilter />
      <NoticeTable data={noticeData} />
      <WPagination
        paddingTop="4px"
        page={filter.page}
        pagination={pagination}
        count={totalPages}
      />
    </Stack>
  );
};

export default NoticePage;
