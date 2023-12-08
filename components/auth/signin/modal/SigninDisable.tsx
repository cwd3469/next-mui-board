import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { ModalType } from '@components/common/layouts/gnb/types';
import WAlert from '@components/common/modals/WAlert';

const SigninDisable = (props: ModalType) => {
  const { open, handleClose } = props;
  return (
    <WAlert
      open={open}
      handleClose={handleClose}
      maxWidth="xl"
      title="비활성 계정 안내"
    >
      <Stack width="720px">
        <Box height="80px" />
      </Stack>
    </WAlert>
  );
};
SigninDisable.defaultProps = {
  type: 'signin',
};

export default SigninDisable;
