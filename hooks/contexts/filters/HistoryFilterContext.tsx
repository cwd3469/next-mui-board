/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dayjs from 'dayjs';
import { createContext, useCallback, useState } from 'react';
import { FilterDateType, FilterHistoryType, FilterValue } from './type';

const HistoryFilterContext = createContext<{
  filter: FilterHistoryType;
  setInFilter: (value: FilterValue, keyId: string) => void;
  date: FilterDateType;
  setInDate: (date: FilterDateType) => void;
  ulid: string;
  setInUlid: (id: string) => void;
}>({
  ulid: '',
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
  setInUlid: (id: string) => {
    return;
  },
  setInDate: (date: FilterDateType) => {
    return;
  },
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const HistoryFilterProvider = ({ children }: Props): JSX.Element => {
  const [filter, setFilter] = useState<FilterHistoryType>({
    code: '0',
    page: 1,
    keyword: '',
    status: '',
  });
  const [date, setDate] = useState<FilterDateType>({
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
  });
  const [ulid, setUlid] = useState<string>('');

  const setInFilter = useCallback((value: FilterValue, keyId: string) => {
    setFilter((prec) => {
      return { ...prec, [keyId]: value };
    });
  }, []);

  const setInDate = useCallback((date: FilterDateType) => {
    setDate(date);
  }, []);
  const setInUlid = useCallback((id: string) => {
    setUlid(id);
  }, []);

  return (
    <HistoryFilterContext.Provider
      value={{
        filter,
        setInFilter,
        date,
        setInDate,
        ulid,
        setInUlid,
      }}
    >
      {children}
    </HistoryFilterContext.Provider>
  );
};

export { HistoryFilterContext, HistoryFilterProvider };
