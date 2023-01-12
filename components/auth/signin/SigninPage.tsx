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

const SigninPage = () => {
  const toast = useToastContext();
  // const { mutate: postSigninMutate } = useSigninMutation();
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [accountType, setAccountType] = useState<string>('');
  const [modalLabel, setModalLabel] = useState<SigninState>('first');
  const [tokenList, setTokenList] = useState<{
    accessToken: string;
    refreshToken: string;
  }>({
    accessToken: '',
    refreshToken: '',
  });
  const [siginInfo, setSignInfo] = useState<SigninDto>({
    accountId: '',
    password: '',
  });
  const [siginErr, setSignErr] = useState<SigninErr>({
    accountId: { msg: '', boo: false },
    password: { msg: '', boo: false },
  });

  const setStateErr = useCallback((errMsg: ErrorType, keyId: string) => {
    setSignErr((prev) => {
      return { ...prev, [keyId]: errMsg };
    });
  }, []);

  const setState = useCallback((txt: string, keyId: string) => {
    setSignInfo((prev) => {
      return { ...prev, [keyId]: txt };
    });
  }, []);

  const btnDisabled = useCallback(() => {
    for (const k in siginInfo) {
      if (Object.prototype.hasOwnProperty.call(siginInfo, k)) {
        const el = siginInfo[k];
        // 값이 없을 때
        if (!el) {
          setDisabled(true);
          return;
        } else {
          // 값이 있지만 유효성 검사에 통과 하지 못 했을때
          for (const i in siginErr) {
            if (Object.prototype.hasOwnProperty.call(siginErr, i)) {
              const er = siginErr[i];
              if (er.boo) {
                setDisabled(true);
                return;
              }
            }
          }
        }
      }
    }
    setDisabled(false);
  }, [siginErr, siginInfo]);

  const handleClose = useCallback(() => {
    setModalLabel('first');
    setModalOn(false);
  }, []);

  const onOpenModal = useCallback((label: SigninState) => {
    setModalLabel(label);
    setModalOn(true);
  }, []);

  const onClickSignin = useCallback(() => {
    setCookie('accountId', siginInfo.accountId);
    setCookie('hospitalCode', siginInfo.hospitalCode);
    let code = '0000';
    switch (code) {
      /// 가입 대기
      case '0050':
        onOpenModal('not-approved');
        return;
      /// 휴면 상태
      case '0051':
        onOpenModal('dormant');
        return;
      /// 운영팀에 의해 정지된 계정
      case '0055':
        onOpenModal('disable');
        return;
      case '0057':
        onOpenModal('excess');
        return;
      case '0058':
        onOpenModal('first');
        return;
      default:
        onOpenModal('success');
        setTokenList({
          accessToken: 'accessToken',
          refreshToken: 'refreshToken',
        });
        return;
    }
    // postSigninMutate(siginInfo, {
    //   onSuccess: (res) => {
    //     if (res.data.status === 'FAIL') {
    //       // toast?.on(
    //       //   '탈퇴된 계정입니다. \n 관리자에게 문의 하시길 바랍니다.',
    //       //   'error',
    //       // );
    //       switch (res.data.code) {
    //         /// 가입 대기
    //         case '0050':
    //           onOpenModal('not-approved');
    //           return;
    //         /// 휴면 상태
    //         case '0051':
    //           onOpenModal('dormant');

    //           return;
    //         /// 운영팀에 의해 정지된 계정
    //         case '0055':
    //           onOpenModal('disable');
    //           return;
    //         default:
    //           return;
    //       }
    //     }
    //     if (res.data.status === 'SUCCESS') {
    //       const userInfo: UserInfoInterface = jwtDecode(
    //         res.data.data?.accessToken,
    //       );
    //       /// 비밀번호 발급 기간이 90일 초과일때
    //       if (!userInfo.credentialsNonExpired) {
    //         onOpenModal('excess');
    //         return;
    //       }
    //       /// 임시 비밀번호 발급 상태
    //       if (userInfo.needResetPassword) {
    //         onOpenModal('first');
    //         return;
    //       }
    //       onOpenModal('success');
    //       setTokenList({
    //         accessToken: res.data.data?.accessToken,
    //         refreshToken: res.data.data?.refreshToken,
    //       });
    //       return;
    //     }
    //   },
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   onError: (errMsg: any) => {
    //     if (errMsg) {
    //       toast?.on(`아이디 또는 비밀번호를 확인해 주세요.`, 'error');
    //     }
    //   },
    // });
  }, [onOpenModal, siginInfo.accountId, siginInfo.hospitalCode]);

  useEffect(() => {
    btnDisabled();
  }, [btnDisabled]);

  useEffect(() => {
    const cookieId = getCookie('accountId');
    if (cookieId) {
      setSignInfo((prec) => {
        return {
          ...prec,
          ['accountId']: cookieId as string,
        };
      });
    }
  }, []);
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
        <Box sx={{ paddingTop: '22px' }} />
        <Stack gap="5px">
          <WButton
            onClick={onClickSignin}
            disabled={disabled}
            variant="contained"
            sx={{
              width: '100%',
              fontSize: '16px',
            }}
          >
            로그인
          </WButton>
        </Stack>
        <Box sx={{ paddingTop: '71px' }} />
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
