import { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import WSelect, { OptionType } from '..';

const WSelectPayment = (props: {
  callBack: (id: string, keyId: string) => void;
}) => {
  const option: OptionType[] = [
    { id: 'IN_PREPARE', name: '조제 중' },
    { id: 'OUTSTANDING', name: '결제 대기' },
  ];
  const [state, setState] = useState<string>(option[0].id);
  const onSelectOption = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setState(value);
    props.callBack(value, 'medicineStatus');
  };
  return (
    <WSelect
      name={'wSelectPayment'}
      value={state}
      width={'126px'}
      onChange={onSelectOption}
      options={option}
    />
  );
};

export default WSelectPayment;
