import { Gnb } from '@components/common/layouts/gnb/Gnb';
import { WLayout } from '@components/common/layouts/WLayout';
import RequestPage from '@components/preparation/request/RequestPage';
import { RequestFilterProvider } from '@hooks/contexts/filters/RequestFilterContext';

const Request = () => {
  return (
    <RequestFilterProvider>
      <div>
        <Gnb />
        <WLayout>
          <RequestPage />
        </WLayout>
      </div>
    </RequestFilterProvider>
  );
};

export default Request;
