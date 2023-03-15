import { FilterAllOtions, FilterDateType } from '@hooks/contexts/filters/type';
import { DateRange } from '@mui/x-date-pickers-pro';
import { stringToDey } from '@utils/date';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface UseFilterEffectType {
  filter?: FilterAllOtions;
  setFilter?: (filterState: FilterAllOtions) => void;
  setDate?: (rang: DateRange<Dayjs>) => void;
  setDateString?: (date: FilterDateType) => void;
}

const useFilterEffect = (props: UseFilterEffectType) => {
  const router = useRouter();

  useEffect(() => {
    const query = router.query;
    const {
      code,
      keyword,
      page,
      status,
      preparationStatus,
      deliveryStatus,
      paymentStatus,
      startDate,
      endDate,
    } = query;

    if (props.filter) {
      let reFilter: FilterAllOtions = props.filter;

      if (code) {
        reFilter = {
          ...reFilter,
          ['code']: code as string,
        };
      }
      if (page) {
        reFilter = {
          ...reFilter,
          ['page']: Number(page as string),
        };
      }
      if (keyword) {
        reFilter = {
          ...reFilter,
          ['keyword']: keyword as string,
        };
      }
      if (status) {
        reFilter = {
          ...reFilter,
          ['status']: status as string,
        };
      }
      if (preparationStatus) {
        reFilter = {
          ...reFilter,
          ['preparationStatus']: preparationStatus as string,
        };
      }
      if (deliveryStatus) {
        reFilter = {
          ...reFilter,
          ['deliveryStatus']: deliveryStatus as string,
        };
      }
      if (paymentStatus) {
        reFilter = {
          ...reFilter,
          ['paymentStatus']: paymentStatus as string,
        };
      }
      if (props.setFilter) {
        props.setFilter(reFilter);
      }
    }

    if (startDate && endDate) {
      const start = stringToDey(startDate as string);
      const end = stringToDey(endDate as string);
      const range: DateRange<Dayjs> = [start, end];
      if (props.setDate) {
        props.setDate(range);
      }

      const dayString: FilterDateType = {
        startDate: startDate as string,
        endDate: startDate as string,
      };
      if (props.setDateString) {
        props.setDateString(dayString);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);
};

export default useFilterEffect;
