import { Gnb } from '@components/common/layouts/gnb/Gnb';
import { WLayout } from '@components/common/layouts/WLayout';
import BusinessHourPage from '@components/setting/businessHour/BusinessHourPage';

const BusinessHour = () => {
  return (
    <div>
      <Gnb />
      <WLayout>
        <BusinessHourPage />
      </WLayout>
    </div>
  );
};

export default BusinessHour;
