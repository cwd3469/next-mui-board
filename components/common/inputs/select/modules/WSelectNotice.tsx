import { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import WSelect, { OptionType } from '..';

const WSelectNotice = (props: {
  callBack: (id: string, keyId: string) => void;
}) => {
  const option: OptionType[] = [
    { id: 'DEFULT', name: '전체' },
    { id: 'NOTICE', name: '공지' },
    { id: 'UPDATE', name: '업데이트' },
  ];
  const [state, setState] = useState<string>(option[0].id);
  const onSelectOption = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setState(value);
    props.callBack(value, 'status');
  };
  return (
    <WSelect
      name={'expenses'}
      value={state}
      width={'126px'}
      onChange={onSelectOption}
      options={option}
    />
  );
};

export default WSelectNotice;
