import WTimepicker from '..';
import { Grid, styled, Box, Typography } from '@mui/material';

export const TimeBox = styled(Grid)((GridTypeMap) => ({
  border: '1px solid #ddd',
  width: '160px',
  borderRadius: '6px',
  padding: '0',
  height: '36px',
  alignItems: 'center',
}));

interface TimepickerType {
  startTime: (time: Date) => void;
  endTime: (time: Date) => void;
  active: boolean;
  startState: Date;
  endState: Date;
  disabled?: boolean;
}

const BusinessTimePicker = (props: TimepickerType) => {
  const { startTime, endTime, startState, endState, active, disabled } = props;

  return (
    <TimeBox
      container
      sx={{
        borderColor: active ? '#4ac6ff' : '#ddd',
        backgroundColor: disabled ? '#ebeced' : '#fff',
      }}
    >
      <Box sx={{ width: '45%' }}>
        <WTimepicker
          disabled={disabled}
          selected={startState}
          onChange={(date) => {
            if (date) startTime(date);
          }}
          sx={{
            '& .MuiInputBase-input': {
              padding: '7px 0px 7px 5px',
            },
          }}
        />
      </Box>
      <Typography color="#999">~</Typography>
      <Box sx={{ width: '45%' }}>
        <WTimepicker
          disabled={disabled}
          selected={endState}
          onChange={(date) => {
            if (date) endTime(date);
          }}
          sx={{
            '& .MuiInputBase-input': {
              padding: '7px 5px 7px 0px',
            },
          }}
        />
      </Box>
    </TimeBox>
  );
};

export default BusinessTimePicker;
