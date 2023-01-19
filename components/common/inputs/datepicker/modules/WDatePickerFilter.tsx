import { FilterDateType } from '@hooks/contexts/filters/type';
import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import WDatePicker from '..';

const WDatePickerFilter = (props: {
  setInDate: (date: FilterDateType) => void;
}) => {
  const [date, setDate] = useState<DateRange<Dayjs>>([dayjs(), dayjs()]);

  const handleDate = (
    date: DateRange<Dayjs>,
    keyboardInputValue?: string | undefined,
  ) => {
    setDate(date);
    const start = date[0] ? date[0] : dayjs();
    const end = date[1] ? date[1] : dayjs();
    const startFormat = dayjs(start).format('YYYY-MM-DD');
    const endFormat = dayjs(end).format('YYYY-MM-DD');
    const filterDate: FilterDateType = {
      startDate: startFormat,
      endDate: endFormat,
    };
    props.setInDate(filterDate);
  };
  return <WDatePicker date={date} selectDate={handleDate} />;
};

export default WDatePickerFilter;
