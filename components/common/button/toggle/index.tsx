import styled from '@emotion/styled';
import { ToggleButton } from '@mui/material';

export const WToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: '6px',
  border: '1px solid #ebeced',
  color: '#cccccc',
  letterSpacing: '-0.13px',
  fontWeight: '400',
  fontSize: '13px',
  '&.Mui-selected': {
    border: '1px solid #4AC6FF',
    fontWeight: '400',
  },
}));
