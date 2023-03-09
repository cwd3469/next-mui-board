import { Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SignupStepOne from './modal/SignupStepOne';
import SignupStepThree from './modal/SignupStepThree';

const Signup = () => {
  const [modalOn, setModalOn] = useState<boolean>(false);
  const handleOpen = () => setModalOn(true);
  const handleClose = () => setModalOn(false);
  return (
    <Grid container justifyContent={'space-between'} gap="10px">
      <Typography
        display="block"
        fontWeight="normal"
        color="#555555"
        letterSpacing="-0.13px"
        fontSize="13px"
      >
        약국 제휴를 하고 싶으신가요?
      </Typography>
      <Button
        sx={{
          padding: '0px',
          color: '#000',
          fontWeight: 'normal',
          fontSize: '13px',
          letterSpacing: '-0.13px',
        }}
        variant="text"
        onClick={handleOpen}
      >
        약국 담당자 회원가입{' '}
        <ArrowForwardIosIcon sx={{ fontSize: '11px', width: '18px' }} />
      </Button>
      <SignupStepOne open={modalOn} handleClose={handleClose} />
    </Grid>
  );
};

export default Signup;
