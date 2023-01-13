import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { WeekendDto } from '../type';
import { getFormatTime } from '@utils/date';
import BusinessTimePicker from '@components/common/inputs/timepicker/modules/BusinessTimePicker';
import WSwitch from '@components/common/inputs/WSwitch';

interface WeekFormType {
  week: string;
  name: string;
  open: boolean;
  openTime: Date;
  closeTime: Date;
  setWeekOnChange: (value: WeekendDto, keyId: string) => void;
}

const BusinessWeekForm = (props: WeekFormType) => {
  const { week, name, open, setWeekOnChange, openTime, closeTime } = props;
  const [startTime, setStart] = useState<Date>(openTime);
  const [endTime, setEnd] = useState<Date>(closeTime);
  const [hospitalOpen, setHospitalOpen] = useState<boolean>(open);

  const info = {
    fullWidth: '128px',
    switchheight: '39px',
    switchWidth: '65px',
    switchOn: '"ON"',
    switchOff: '"OFF"',
    moveTranslateX: 'translateX(63px)',
    borderRadius: '6px',
  };
  // 약국 오픈 시간
  const setStartime = useCallback(
    (time: Date) => {
      setStart(time);
      const startDate = getFormatTime(time);
      const endDate = getFormatTime(endTime);
      const res = {
        openTime: startDate,
        closeTime: endDate,
        hasOperation: hospitalOpen,
      };
      setWeekOnChange(res, week);
    },
    [endTime, hospitalOpen, setWeekOnChange, week],
  );
  // 약국 닫는 시간
  const setEndTime = useCallback(
    (time: Date) => {
      setEnd(time);
      const startDate = getFormatTime(startTime);
      const endDate = getFormatTime(time);
      const res = {
        openTime: startDate,
        closeTime: endDate,
        hasOperation: hospitalOpen,
      };
      setWeekOnChange(res, week);
    },
    [hospitalOpen, setWeekOnChange, startTime, week],
  );

  // 약국 당일 오픈 유무
  const setOpenSwich = useCallback(
    (boo: boolean) => {
      setHospitalOpen(boo);
      const startDate = getFormatTime(startTime);
      const endDate = getFormatTime(endTime);
      const res = {
        openTime: startDate,
        closeTime: endDate,
        hasOperation: boo,
      };
      setWeekOnChange(res, week);
    },
    [endTime, setWeekOnChange, startTime, week],
  );

  return (
    <Grid container alignItems={'center'} gap="8px" justifyContent={'start'}>
      <Typography
        variant="body2"
        fontWeight="500"
        color={week === 'sun' || week === 'holiday' ? '#f11919' : '#333'}
        paddingRight="6px"
      >
        {name}
      </Typography>
      <BusinessTimePicker
        startTime={setStartime}
        endTime={setEndTime}
        startState={startTime}
        endState={endTime}
        active={hospitalOpen}
        disabled={!hospitalOpen}
      />
      <WSwitch
        checked={hospitalOpen}
        info={info}
        onChange={() => {
          setOpenSwich(!hospitalOpen);
        }}
      />
    </Grid>
  );
};

export default BusinessWeekForm;
