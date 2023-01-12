import { Gnb } from '@components/common/layouts/gnb/Gnb';
import { WLayout } from '@components/common/layouts/WLayout';
import NoticePage from '@components/notice/NoticePage';
import { NoticeFilterProvider } from '@hooks/contexts/filters/NoticeFilterContext';

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
