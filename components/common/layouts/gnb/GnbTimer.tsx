import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, Button, Grid, styled, Typography as Text } from '@mui/material';
import { useToastContext } from '@hooks/utils/useToastContext';
import useTimer, { TimerInterface } from '@hooks/utils/useTimer';
import clock from 'public/assets/icon/clock.svg';
import colors from '@styles/colors';
import GnbModal from './GnbModal';

const fontStyle = {
  fontSize: '12px',
  fontWeight: '400',
  textAlign: 'center',
  lineHeight: '1',
  color: '#666',
};

export const Extension = styled(Button)(({ theme }) => ({
  backgroundColor: colors.gray_11,
  minWidth: 'auto',
  padding: 0,
}));

export default function GnbTimer() {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const toast = useToastContext();
  const action = useCallback(() => {
    //TODO: 작업을 위해 임시 기능 폐쇄
    // toast?.on('로그인 유효 시간 만료', 'error');
    // router.push('/signin');
  }, []);

  const resend = useCallback(() => {
    //TODO: 작업을 위해 임시 기능 폐쇄
    // setOpen(false);
    // alert('시간 연장 합니다.');
  }, []);

  const props: TimerInterface = {
    time: 3,
    action: action,
  };

  const { timer, reStart, minutes, seconds } = useTimer(props);

  useEffect(() => {
    if (minutes === 0 && seconds === 59) {
      //TODO: 작업을 위해 임시 기능 폐쇄
      // handleOpen();
    }
  }, [minutes, seconds]);

  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, []);

  return (
    <Grid container justifyContent={'center'} alignItems="center" width="auto">
      <Box sx={{ width: '15px', height: '15px', position: 'relative' }}>
        <Image src={clock} alt="시계아이콘" layout="fill" />
      </Box>

      <Text
        variant="caption"
        lineHeight="1"
        sx={{ ...fontStyle, width: '27px' }}
      >
        {timer}
      </Text>
      <Box width="5px" />
      <Extension
        sx={{ ...fontStyle }}
        onClick={() => {
          reStart();
          resend();
        }}
      >
        연장
      </Extension>
      <GnbModal
        open={open}
        handleClose={handleClose}
        timer={timer}
        resend={resend}
      />
    </Grid>
  );
}
