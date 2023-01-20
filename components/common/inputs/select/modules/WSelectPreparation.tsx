import { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import WSelect, { OptionType } from '..';

const WSelectPreparation = (props: {
  callBack: (id: string, keyId: string) => void;
}) => {
  const option: OptionType[] = [
    { id: 'DEFULT', name: '상태 전체' },
    { id: 'CANCEL', name: '취소' },
  ];
  const [state, setState] = useState<string>(option[0].id);
  const onSelectOption = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setState(value);
    props.callBack(value, 'preparationStatus');
  };
  return (
    <WSelect
      name={'wSelectPreparation'}
      value={state}
      width={'98px'}
      onChange={onSelectOption}
      options={option}
    />
  );
};

export default WSelectPreparation;
