/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dayjs from 'dayjs';
import { createContext, useCallback, useState } from 'react';
import { FilterDateType, FilterProceedType, FilterValue } from './type';

const ProceedFilterContext = createContext<{
  filter: FilterProceedType;
  setInFilter: (value: FilterValue, keyId: string) => void;
  date: FilterDateType;
  setInDate: (date: FilterDateType) => void;
}>({
  filter: {
    code: '0',
    page: 1,
    keyword: '',
    // 변경 될 예정
    preparationStatus: '',
    deliveryStatus: '',
  },
  setInFilter: (value: FilterValue, keyId: string) => {
    return;
  },
  date: {
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
  },
  setInDate: (date: FilterDateType) => {
    return;
  },
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const ProceedFilterProvider = ({ children }: Props): JSX.Element => {
  const [filter, setFilter] = useState<FilterProceedType>({
    code: '0',
    page: 1,
    keyword: '',
    status: '',
  });
  const [date, setDate] = useState<FilterDateType>({
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
  });

  const setInFilter = useCallback((value: FilterValue, keyId: string) => {
    setFilter((prec) => {
      return { ...prec, [keyId]: value };
    });
  }, []);

  const setInDate = useCallback((date: FilterDateType) => {
    setDate(date);
  }, []);

  return (
    <ProceedFilterContext.Provider
      value={{
        filter,
        setInFilter,
        date,
        setInDate,
      }}
    >
      {children}
    </ProceedFilterContext.Provider>
  );
};

export { ProceedFilterContext, ProceedFilterProvider };
