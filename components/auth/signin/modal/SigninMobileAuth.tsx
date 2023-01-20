import useMobileAuth from '@components/auth/hooks/useMobileAuth';
import AuthMobileView from '@components/auth/views/AuthMobileView';
import { ModalType } from '@components/common/layouts/gnb/types';
import useMutationAuthentication from '@hooks/apis/auth/signin/useMutationAuthentication';
import { SigninInfoContext } from '@hooks/contexts/info/SigninInfoContext';
import { useToastContext } from '@hooks/utils/useToastContext';
import { mobileFormat } from '@utils/formatNumber';
import React, { useContext, useEffect } from 'react';
import { useCallback, useState } from 'react';
import { SigninState } from '../type';
import SigninProcess from './SigninProcess';

const SigninMobileAuth = (props: ModalType) => {
  const { info } = useContext(SigninInfoContext);
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
    authRequestDisabled,
  } = useMobileAuth();
  const toast = useToastContext();
  const [modalLabel, setModalLabel] = useState<SigninState>('first');
  const [modalOn, setModalOn] = useState<boolean>(false);
  const mobileFormChange = info ? mobileFormat(info.accountMobileNum) : '';
  const { onClickMobileAuthRequest, onClickMobileAuthVerify } =
    useMutationAuthentication({
      info: info,
      authenticationCode: authValue,
      hanbleClose: props.handleClose,
      onOpenTextFiled: onAbledAuthInput,
      onOpenModal: () => {
        setModalOn(true);
        onSetAuthDisabled();
        resetModalClose();
      },
      onOpenProcess: (label: SigninState) => {
        setModalLabel(label);
      },
    });

  const resetModalClose = useCallback(() => {
    onClickReset();
    props.handleClose();
    setModalOn(false);
  }, [onClickReset, props]);

  return (
    <>
      <AuthMobileView
        mobileDisabled
        btnDisabled={authRequestDisabled}
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
        onClickAuthNumSend={onClickMobileAuthRequest}
        signupAuthOnClick={onClickMobileAuthVerify}
        resetModalClose={resetModalClose}
        timerActice={onAuthTimeOut}
        timerResend={onTimerDisabled}
      />
      <SigninProcess
        open={modalOn}
        handleClose={resetModalClose}
        label={modalLabel}
      />
    </>
  );
};

export default SigninMobileAuth;
