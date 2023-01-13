/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createContext, useCallback, useState } from 'react';
import { FilterNoticeType, FilterValue } from './type';

const NoticeFilterContext = createContext<{
  filter: FilterNoticeType;
  setInFilter: (value: FilterValue, keyId: string) => void;
}>({
  filter: {
    code: '0',
    page: 1,
    keyword: '',
    status: '',
  },
  setInFilter: (value: FilterValue, keyId: string) => {
    return;
  },
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const NoticeFilterProvider = ({ children }: Props): JSX.Element => {
  const [filter, setFilter] = useState<FilterNoticeType>({
    code: '0',
    page: 1,
    keyword: '',
    status: '',
  });

  const setInFilter = useCallback((value: FilterValue, keyId: string) => {
    setFilter((prec) => {
      return { ...prec, [keyId]: value };
    });
  }, []);

  return (
    <NoticeFilterContext.Provider
      value={{
        filter,
        setInFilter,
      }}
    >
      {children}
    </NoticeFilterContext.Provider>
  );
};

export { NoticeFilterContext, NoticeFilterProvider };