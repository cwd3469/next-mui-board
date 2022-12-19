import { Alert, CircularProgress, styled } from '@mui/material';

export const WAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: '#fff',
  border: '1px solid #999',
  borderWidth: '1px',
  borderRadius: '0px',
  ...theme.typography.body1,
  color: '#000',
  padding: '25px',
  '&.MuiPaper-root': {
    alignItems: 'center',
  },
  '& .MuiAlert-message': {
    padding: '0px',
    marginLeft: '30px',
  },
  '& .MuiAlert-icon': {
    padding: '0px',
    margin: '0px',
  },
}));

export const WCircularProgress = styled(CircularProgress)(({ theme }) => ({
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#0acf83',
    transition: 'transform 10s ease-in-out',
  },
}));
