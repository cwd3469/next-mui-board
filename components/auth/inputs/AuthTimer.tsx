import React, { useState, useEffect } from 'react';
import useTimer, { TimerResendInterface } from '@hooks/utils/useTimer';
import { Grid, Typography } from '@mui/material';
import { TimerButton } from '../signup/styled';

export default function AuthTimer(props: TimerResendInterface) {
  const { timer, minutes, seconds, reStart } = useTimer({
    action: props.action,
    time: props.time,
  });
  const { resend } = props;
  const [showBtn, setShowBtn] = useState<boolean>(false);

  useEffect(() => {
    if (minutes <= 2) {
      if (seconds <= 30) {
        setShowBtn(true);
      }
    } else {
      setShowBtn(false);
    }
  }, [minutes, seconds]);

  return (
    <Grid
      container
      justifyContent={'center'}
      alignItems="center"
      gap="8px"
      width="auto"
    >
      {showBtn ? (
        <TimerButton
          onClick={() => {
            resend();
            reStart();
          }}
        >
          재발송
        </TimerButton>
      ) : (
        ''
      )}

      <Typography variant="body2" fontWeight={'bold'} color="#4ac6ff">
        {timer}
      </Typography>
    </Grid>
  );
}
