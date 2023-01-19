import React, { useState, useCallback, useEffect } from 'react';
import { Stack, Grid, Box } from '@mui/material';
import Image from 'next/image';
import { getCookie, setCookie } from 'cookies-next';
import { useToastContext } from '@hooks/utils/useToastContext';
import { SigninDto, SigninState, SigninErr } from './type';
import { ErrorType } from '@components/common/inputs/type';
import { SigninLayout } from '../styled';
import { Logo } from '@components/common/layouts/WLayout';
import {
  WPwTextField,
  WUseridTextField,
} from '@components/common/inputs/textField/modules';
import { WButton } from '@components/common/button/WButton';
import SigninProcess from './modal/SigninProcess';
import useSignin from '../hooks/useSignin';
import useMutationSignin from '@hooks/apis/auth/signin/useMutationSignin';

const SigninPage = () => {
  const {
    modalOn,
    disabled,
    accountType,
    modalLabel,
    tokenList,
    siginInfo,
    siginErr,
    onOpenModal,
    handleClose,
    setState,
    setStateErr,
    setTokenList,
  } = useSignin();
  const { onClickSignin } = useMutationSignin({
    info: siginInfo,
    onOpenModal,
    setTokenList,
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
      <SigninProcess
        open={modalOn}
        handleClose={handleClose}
        label={modalLabel}
        position={accountType}
        tokenList={tokenList}
      />
    </Stack>
  );
};
export default SigninPage;
