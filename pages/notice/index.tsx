import { Gnb } from '@components/common/layouts/gnb/Gnb';
import { WLayout } from '@components/common/layouts/WLayout';
import { NoticeFilterProvider } from '@hooks/contexts/filters/NoticeFilterContext';
import dynamic from 'next/dynamic';

const NoticePage = dynamic(() => import('../../components/notice/NoticePage'), {
  loading: () => <p>Loading...</p>,
});

const Notice = () => {
  return (
    <NoticeFilterProvider>
      <div>
        <Gnb />
        <WLayout>
          <NoticePage />
        </WLayout>
      </div>
    </NoticeFilterProvider>
  );
};

export default Notice;
