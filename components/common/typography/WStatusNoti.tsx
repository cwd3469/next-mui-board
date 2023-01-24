import { Box, Grid, styled, Typography } from '@mui/material';

export const WNotiTypography = styled(Typography)(({ theme }) => ({
  '&.title': {
    color: '#666',
    ...theme.typography.body2,
  },
  '&.counting': {
    color: '#4ac6ff',
    fontWeight: 'Bold',
    fontSize: '20px',
    lineHeight: '20px',
  },
  '&.units': {
    ...theme.typography.body1,
    color: '#000',
  },
}));
export const WNotiBox = styled(Box)(({ theme }) => ({
  width: '2px',
  height: '14px',
  backgroundColor: '#666',
}));

const WStatusNoti = (props: {
  title: string;
  counting: string;
  units: string;
}) => {
  return (
    <Grid container width="auto" alignItems="center" gap="1px">
      <WNotiTypography className="title">{props.title}</WNotiTypography>
      <Box width="12px" />
      <WNotiTypography className="counting">{props.counting}</WNotiTypography>
      <WNotiTypography className="units">{props.units}</WNotiTypography>
    </Grid>
  );
};

export default WStatusNoti;
