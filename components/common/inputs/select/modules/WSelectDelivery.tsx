import { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import WSelect, { OptionType } from '..';

const WSelectDelivery = (props: {
  callBack: (id: string, keyId: string) => void;
}) => {
  const option: OptionType[] = [
    { id: 'DEFULT', name: '배송 상태 전체' },
    { id: 'WAIT', name: '배송 대기' },
    { id: 'ONGOING', name: '배송 중' },
    { id: 'COMPLETION', name: '배송 완료' },
  ];
  const [state, setState] = useState<string>(option[0].id);
  const onSelectOption = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setState(value);
    props.callBack(value, 'deliveryStatus');
  };
  return (
    <WSelect
      name={'wSelectDelivery'}
      value={state}
      width={'126px'}
      onChange={onSelectOption}
      options={option}
    />
  );
};

export default WSelectDelivery;
