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
  const { filter } = useContext(NoticeFilterContext);
  // const { noticeData, totalPages } = useNoticeList(filter);
  const noticeData: NoticeInterface[] = [
    {
      ulid: '1',
      title: '챗봇 연동에 대한 안내사항',
      status: '공지',
      createAt: '2022.11.03',
      number: 1,
    },
    {
      ulid: '2',
      title: '챗봇 연동에 대한 안내사항',
      status: '업데이트',
      createAt: '2022.11.04',
      number: 2,
    },
  ];
  const totalPages = 1;
  return <NoticeTemplates data={noticeData} totalPages={totalPages} />;
};

const NoticeTemplates = (props: {
  data: NoticeInterface[];
  totalPages: number;
}) => {
  const { filter, setInFilter } = useContext(NoticeFilterContext);

  const pagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setInFilter(value, 'page');
  };
  return (
    <Stack gap="20px">
      <NoticeFilter />
      <NoticeTable data={props.data} />
      <WPagination
        paddingTop="4px"
        page={filter.page}
        pagination={pagination}
        count={props.totalPages}
      />
    </Stack>
  );
};

export default NoticePage;
