/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dayjs from 'dayjs';
import { createContext, useCallback, useState } from 'react';
import { DataPagition, FilterDateType, FilterValue } from './type';

const RequestFilterContext = createContext<{
  filter: DataPagition;
  setInFilter: (value: FilterValue, keyId: string) => void;
  date: FilterDateType;
  setInDate: (date: FilterDateType) => void;
}>({
  filter: {
    code: '0',
    page: 1,
    keyword: '',
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

const RequestFilterProvider = ({ children }: Props): JSX.Element => {
  const [filter, setFilter] = useState<DataPagition>({
    code: '0',
    page: 1,
    keyword: '',
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
    <RequestFilterContext.Provider
      value={{
        filter,
        setInFilter,
        date,
        setInDate,
      }}
    >
      {children}
    </RequestFilterContext.Provider>
  );
};

export { RequestFilterContext, RequestFilterProvider };
