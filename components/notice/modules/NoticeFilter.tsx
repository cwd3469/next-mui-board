import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import WSearchInput from '@components/common/inputs/textField/modules/WSearchInput';
import { NoticeFilterContext } from '@hooks/contexts/filters/NoticeFilterContext';
import WSelectNotice from '@components/common/inputs/select/modules/WSelectNotice';

export interface OptionType {
  id: string;
  name: string;
}

const NoticeFilter = () => {
  const { filter, setInFilter } = React.useContext(NoticeFilterContext);

  const searchEvent = (txt: string) => {
    setInFilter(txt, 'keyword');
  };

  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'}>
      <Grid container width="auto" gap={'10px'}>
        <WSelectNotice
          value={filter.status}
          callBack={(id: string, keyId: string) => setInFilter(id, keyId)}
        />
        <WSearchInput
          queryValue={filter.keyword}
          search={searchEvent}
          placeholder="제목 검색"
        />
      </Grid>
    </Grid>
  );
};

export default NoticeFilter;
