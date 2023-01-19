import { Gnb } from '@components/common/layouts/gnb/Gnb';
import { WLayout } from '@components/common/layouts/WLayout';
import HistoryPage from '@components/preparation/history/HistoryPage';
import { HistoryFilterProvider } from '@hooks/contexts/filters/HistoryFilterContext';

const History = () => {
  return (
    <HistoryFilterProvider>
      <div>
        <Gnb />
        <WLayout>
          <HistoryPage />
        </WLayout>
      </div>
    </HistoryFilterProvider>
  );
};

export default History;
