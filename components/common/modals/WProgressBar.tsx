import useAxiosInterceptor from '@hooks/apis/useAxiosInterceptor';
import { Backdrop, Box } from '@mui/material';
import { WCircularProgress } from './styled';

const WProgressBar = () => {
  const progressOn = useAxiosInterceptor();

  const style = {
    width: '100%',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: 9999999999,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      }}
      open={progressOn}
    >
      <Box sx={style}>
        <WCircularProgress />
      </Box>
    </Backdrop>
  );
};

export default WProgressBar;
