import React from 'react';
import { Stack, Grid, Box } from '@mui/material';
import { Logo } from '@components/common/layouts/WLayout';
import {
  WPwTextField,
  WUseridTextField,
} from '@components/common/inputs/textField/modules';
import { WButton } from '@components/common/button/WButton';
import useSignin from '../hooks/useSignin';
import useMutationSignin from '@hooks/apis/auth/signin/useMutationSignin';
import SigninMobileAuth from './modal/SigninMobileAuth';

const SigninPage = () => {
  const {
    modalOn,
    disabled,
    modalLabel,
    siginInfo,
    siginErr,
    onOpenModal,
    handleClose,
    setState,
    setStateErr,
  } = useSignin();
  const { onClickSignin } = useMutationSignin({
    info: siginInfo,
    onOpenModal,
  });
  return (
    <Stack>
      <Grid container justifyContent={'center'} sx={{ paddingBottom: '108px' }}>
        <Logo
          sx={{
            width: '266px',
            height: '58px',
          }}
        />
      </Grid>
      <Stack gap="20px">
        <WUseridTextField
          state={siginInfo.accountId}
          setState={setState}
          keyId="accountId"
          err={siginErr.accountId}
          setErr={setStateErr}
        />
        <WPwTextField
          state={siginInfo.password}
          setState={setState}
          keyId="password"
          err={siginErr.password}
          setErr={setStateErr}
        />
        <Box sx={{ paddingTop: '1px' }} />
        <Stack gap="5px">
          <WButton
            onClick={onClickSignin}
            disabled={disabled}
            variant="contained"
            sx={{
              width: '100%',
            }}
          >
            로그인
          </WButton>
        </Stack>
        <Box sx={{ paddingTop: '50px' }} />
      </Stack>
      <SigninMobileAuth open={modalOn} handleClose={handleClose} />
    </Stack>
  );
};
export default SigninPage;
