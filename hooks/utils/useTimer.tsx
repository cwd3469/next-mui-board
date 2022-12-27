import { useState, useEffect } from 'react';

export interface TimerInterface {
  action: () => void;
  time: number;
}

export default function useTimer(props: TimerInterface) {
  const { time, action } = props;
  const [minutes, setMinutes] = useState<number>(time);
  const [seconds, setSeconds] = useState<number>(0);

  const reStart = () => {
    setMinutes(time);
    setSeconds(0);
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
          action();
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [minutes, seconds, action]);

  let timer = `${minutes}:${seconds < 10 ? 0 + seconds : seconds}`;
  return { timer, minutes, seconds, reStart };
}
