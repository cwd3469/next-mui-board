import { Gnb } from '@components/common/layouts/gnb/Gnb';
import { WLayout } from '@components/common/layouts/WLayout';
import { ProceedFilterProvider } from '@hooks/contexts/filters/ProceedFilterContext';

const Proceed = () => {
  return (
    <ProceedFilterProvider>
      <div>
        <Gnb />
        <WLayout>조제 진행</WLayout>
      </div>
    </ProceedFilterProvider>
  );
};

export default Proceed;
