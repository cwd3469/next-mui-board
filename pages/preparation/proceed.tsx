import { Gnb } from '@components/common/layouts/gnb/Gnb';
import { WLayout } from '@components/common/layouts/WLayout';
import ProceedPage from '@components/preparation/proceed/ProceedPage';
import { ProceedFilterProvider } from '@hooks/contexts/filters/ProceedFilterContext';

const Proceed = () => {
  return (
    <ProceedFilterProvider>
      <div>
        <Gnb />
        <WLayout>
          <ProceedPage />
        </WLayout>
      </div>
    </ProceedFilterProvider>
  );
};

export default Proceed;
