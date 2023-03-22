import React from 'react';
import { Grid } from '@mui/material';
import WSearchInput from '@components/common/inputs/textField/modules/WSearchInput';
import WDatePickerFilter from '@components/common/inputs/datepicker/modules/WDatePickerFilter';
import { ProceedFilterContext } from '@hooks/contexts/filters/ProceedFilterContext';
import WSelectPayment from '@components/common/inputs/select/modules/WSelectPayment';

const ProceedFilter = () => {
  const { setInFilter, setInDate } = React.useContext(ProceedFilterContext);

  const searchEvent = (txt: string) => {
    setInFilter(txt, 'keyword');
  };

  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'}>
      <Grid container width="auto" gap={'10px'}>
        <WDatePickerFilter setInDate={setInDate} />
        <WSelectPayment
          callBack={(id: string, keyId: string) => setInFilter(id, keyId)}
        />
        <WSearchInput search={searchEvent} placeholder="제목 검색" />
      </Grid>
    </Grid>
  );
};

export default ProceedFilter;
