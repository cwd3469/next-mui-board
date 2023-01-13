import { Gnb } from '@components/common/layouts/gnb/Gnb';
import { WLayout } from '@components/common/layouts/WLayout';
import NoticeDetailPage from '@components/notice/NoticeDetailPage';
import { NoticeFilterProvider } from '@hooks/contexts/filters/NoticeFilterContext';

const NoticeDetail = () => {
  return (
    <NoticeFilterProvider>
      <div>
        <Gnb />
        <WLayout>
          <NoticeDetailPage />
        </WLayout>
      </div>
    </NoticeFilterProvider>
  );
};

export default NoticeDetail;
