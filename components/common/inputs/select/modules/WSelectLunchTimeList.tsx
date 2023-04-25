import { timeListFn } from '@utils/date';
import { useEffect } from 'react';
import WSelect, { OptionType, WSelectCustomizeType } from '..';
import useSelect from '@hooks/utils/useSelect';

const WSelectLunchTimeList = (props: WSelectCustomizeType) => {
  const { value, callBack, disabled } = props;
  const timeList = timeListFn({
    start: '07',
    end: '24',
    Interval: 30,
    startEndInterval: 30,
  });

  const options: OptionType[] = timeList.map((item) => {
    return { id: item.id, name: item.name };
  });
  const { option, onSelectOption } = useSelect({
    defultId: options[0].id,
    value: value,
    callBack: callBack,
  });
  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <WSelect
      name={'WSelectLunchTimeList'}
      value={option}
      width={'120px !important'}
      height={'200px'}
      onChange={onSelectOption}
      options={options}
      disabled={disabled}
      sx={{
        color: '#000',
        '&.Mui-disabled': {
          backgroundColor: '#ebeced',
          color: '#ddd',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ebeced',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ebeced',
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#4ac6ff',
          '&:hover': {
            borderColor: '#4ac6ff',
          },
        },
        '& .MuiSvgIcon-root': {
          display: 'none',
        },
        '& .MuiSelect-select': {
          padding: '8px 0',
          textAlign: 'center',
          color: '#000',
        },
        '&:hover': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4ac6ff',
          },
        },
      }}
      MenuProps={{
        '& .MuiPaper-root .MuiList-root': {
          width: '140px !important',
        },
      }}
    />
  );
};

export default WSelectLunchTimeList;
