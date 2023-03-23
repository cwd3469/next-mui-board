import React from 'react';
import { Grid } from '@mui/material';
import WSearchInput from '@components/common/inputs/textField/modules/WSearchInput';
import { HistoryFilterContext } from '@hooks/contexts/filters/HistoryFilterContext';
import WSelectPreparation from '@components/common/inputs/select/modules/WSelectPreparation';
import WDatePicker from '@components/common/inputs/datepicker';
import WDatePickerFilter from '@components/common/inputs/datepicker/modules/WDatePickerFilter';
import WSelectDelivery from '@components/common/inputs/select/modules/WSelectDelivery';

const HistoryFilter = () => {
  const { setInFilter, setInDate } = React.useContext(HistoryFilterContext);

  const searchEvent = (txt: string) => {
    setInFilter(txt, 'keyword');
  };

  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'}>
      <Grid container width="auto" gap={'10px'}>
        {/* <WDatePickerFilter setInDate={setInDate} /> */}
        <WSelectPreparation
          callBack={(id: string, keyId: string) => setInFilter(id, keyId)}
        />
        <WSelectDelivery
          callBack={(id: string, keyId: string) => setInFilter(id, keyId)}
        />
        <WSearchInput search={searchEvent} placeholder="제목 검색" />
      </Grid>
    </Grid>
  );
};

export default HistoryFilter;
