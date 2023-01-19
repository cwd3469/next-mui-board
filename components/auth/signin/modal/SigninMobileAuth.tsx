import useMobileAuth from '@components/auth/hooks/useMobileAuth';
import { UserInfoInterface } from '@components/auth/types';
import AuthMobileView from '@components/auth/views/AuthMobileView';
import { ModalType } from '@components/common/layouts/gnb/types';
import { userInfoContext } from '@hooks/contexts/userInfoContext';
import { useToastContext } from '@hooks/utils/useToastContext';
import { mobileFormat, mobileFormatOff } from '@utils/formatNumber';
import { setCookie } from 'cookies-next';
import jwtDecode from 'jwt-decode';
import React from 'react';
import { useCallback, useEffect, useState } from 'react';

interface SigninMobileAuthType extends ModalType {
  tokenList: { accessToken: string; refreshToken: string };
}

const SigninMobileAuth = (props: SigninMobileAuthType) => {
  const userInfo = React.useContext(userInfoContext);
  const {
    authValue,
    mobileValue,
    authDisabled,
    numDisabled,
    authError,
    mobileError,
    onAbledAuthInput,
    onChangeAuthNum,
    onChangeMobile,
    onClickReset,
    onFocusOutAuthNum,
    onTimerDisabled,
    onSetAuthDisabled,
    onAuthTimeOut,
  } = useMobileAuth();
  const toast = useToastContext();
  const [modalOn, setModalOn] = useState<boolean>(false);
  const mobileFormChange = userInfo ? mobileFormat(userInfo.mobileNum) : '';
  //   const { mutate: postCommonMobileAuthMutate } = useCommonMobileAuth();
  //   const { mutate: postCommonVerifyCodeMutate } = useCommonVerifyCode();

  const onSiveToken = useCallback(() => {
    const token = props.tokenList;
    setCookie('accessToken', token.accessToken);
    setCookie('refreshToken', token.refreshToken);
  }, [props.tokenList]);

  const resetModalClose = useCallback(() => {
    onClickReset();
    props.handleClose();
    setModalOn(false);
  }, [onClickReset, props]);

  const onClickAuthNumSend = useCallback(() => {
    onSiveToken();
    onAbledAuthInput();
    const data = {
      mobileNum: mobileFormatOff(mobileFormChange),
      code: authValue,
    };
    console.log(data);

    // postCommonVerifyCodeMutate(data, {
    //   onSuccess: (res) => {
    //     if (res.data.status === 'SUCCESS') {
    //       if (userInfo) {
    //         const permission = permissionOn(userInfo.roles);
    //         onSiveToken();
    //         setInPermission(permission);
    //         setInNameKo(userInfo.nameKo);
    //         switch (permission) {
    //           case 'HOSPITAL_DOCTOR':
    //             router.push('/doctor/telemedicine/reception');
    //             return;
    //           case 'MEDICAL_SUPPORT':
    //             router.push('/doctor/telemedicine/reception');
    //             return;
    //           case 'HOSPITAL_ADMIN':
    //             router.push('/hospital-admin/non-reimburse');
    //             return;
    //         }
    //       }
    //     }
    //     if (res.data.status === 'FAIL') {
    //       errorToast(msg.errMsg(res.data.code));
    //       return;
    //     }
    //   },
    //   onError: (err) => {
    //     errorToast(
    //       '인증번호가 일치하지 않습니다 \n 잠시 후, 다시 시도해 주세요',
    //     );
    //   },
  }, [authValue, mobileFormChange, onAbledAuthInput, onSiveToken]);

  const signupAuthOnClick = useCallback(() => {
    setModalOn(true);
    onSetAuthDisabled();
    resetModalClose();
    // const data = {
    //   mobileNum: mobileFormatOff(mobileValue),
    //   code: authValue,
    // };
    // postCommonVerifyCodeMutate(data, {
    //   onSuccess: (res) => {
    //     if (res.data.status === 'SUCCESS') {
    //       setModalOn(true);
    //       setAuthDisabled(true);
    //       setBgDisable(true);
    //     }
    //     if (res.data.status === 'FAIL') {
    //       toast?.on(msg.errMsg(res.data.code) , 'error');
    //       return;
    //     }
    //   },
    //   onError: (err) => {
    //     toast?.on(
    //       '인증번호가 일치하지 않습니다 \n 잠시 후, 다시 시도해 주세요.',
    //     , 'error');
    //   },
    // });
  }, [onSetAuthDisabled, resetModalClose]);

  return (
    <>
      <AuthMobileView
        mobileDisabled
        open={props.open}
        authValue={authValue}
        mobileValue={mobileFormChange}
        authDisabled={authDisabled}
        bgDisable={false}
        numDisabled={numDisabled}
        authError={authError}
        mobileError={mobileError}
        authOnChange={onChangeAuthNum}
        mobileOnChange={onChangeMobile}
        onTimerDisabled={onTimerDisabled}
        focusOutEvent={onFocusOutAuthNum}
        onClickAuthNumSend={onClickAuthNumSend}
        signupAuthOnClick={signupAuthOnClick}
        resetModalClose={resetModalClose}
        timerActice={onAuthTimeOut}
        timerResend={onTimerDisabled}
      />
    </>
  );
};

export default SigninMobileAuth;
