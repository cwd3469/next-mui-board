import { Box, Grid, SxProps, Theme, Typography } from '@mui/material';

const WSubTitle = (props: {
  title: string;
  subTitle?: string;
  require?: boolean;
  sx?: SxProps<Theme>;
  onClick?: () => void;
}) => {
  const { title, require, subTitle, sx, onClick } = props;
  return (
    <Grid
      container
      alignItems={'center'}
      gap="2px"
      sx={{ cursor: onClick ? 'pointer' : 'default', ...sx }}
      onClick={onClick}
    >
      <Typography variant="subtitle1" className={'mainTitle'}>
        {title}
      </Typography>
      {require ? (
        <Typography variant="body2" color="#4ac6ff" className={'require'}>
          (필수)
        </Typography>
      ) : (
        ''
      )}
      {subTitle ? (
        <>
          <Box width="10px" />
          <Typography variant="body1" color="#4E4E4E" className={'subTitle'}>
            {subTitle}
          </Typography>
        </>
      ) : (
        ''
      )}
    </Grid>
  );
};

export default WSubTitle;
