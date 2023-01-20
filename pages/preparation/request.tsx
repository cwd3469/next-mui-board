import { Gnb } from '@components/common/layouts/gnb/Gnb';
import { WLayout } from '@components/common/layouts/WLayout';
import { RequestFilterProvider } from '@hooks/contexts/filters/RequestFilterContext';

const Request = () => {
  return (
    <RequestFilterProvider>
      <div>
        <Gnb />
        <WLayout>조제 요청</WLayout>
      </div>
    </RequestFilterProvider>
  );
};

export default Request;
