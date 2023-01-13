import { Gnb } from '@components/common/layouts/gnb/Gnb';
import { WLayout } from '@components/common/layouts/WLayout';
import BusinessHourPage from '@components/setting/businessHour/BusinessHourPage';
import { NoticeFilterProvider } from '@hooks/contexts/filters/NoticeFilterContext';

const BusinessHour = () => {
  return (
    <NoticeFilterProvider>
      <div>
        <Gnb />
        <WLayout>
          <BusinessHourPage />
        </WLayout>
      </div>
    </NoticeFilterProvider>
  );
};

export default BusinessHour;
