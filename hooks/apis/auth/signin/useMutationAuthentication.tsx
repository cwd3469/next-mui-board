import {
  SigninInfoType,
  SigninMobileDto,
  SigninState,
  SigninVerifyDto,
} from '@components/auth/signin/type';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { mobileFormatOff } from '@utils/formatNumber';
import { useCallback, useContext } from 'react';
import { useMutation } from 'react-query';
import { apiSigninAuth, apiSigninAuthVerify } from '.';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { userInfoContext } from '@hooks/contexts/userInfoContext';
import { UserInfoInterface } from '@components/auth/types';
import jwtDecode from 'jwt-decode';

interface UseMutationAuthentication {
  info: SigninInfoType;
  authenticationCode: string;
  hanbleClose: () => void;
  onOpenTextFiled: () => void;
  onOpenModal: () => void;
  onOpenProcess: (label: SigninState) => void;
}

const useMutationAuthentication = (props: UseMutationAuthentication) => {
  const {
    info,
    authenticationCode,
    hanbleClose,
    onOpenTextFiled,
    onOpenModal,
    onOpenProcess,
  } = props;
  const router = useRouter();
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const { setInUserInfo } = useContext(userInfoContext);
  const { mutate: mutateSigninAuth } = useMutation(apiSigninAuth);
  const { mutate: mutateSigninAuthVerify } = useMutation(apiSigninAuthVerify);
  //휴대폰 인증 요청
  const onClickMobileAuthRequest = useCallback(() => {
    const dto: SigninMobileDto = {
      accountMobileNum: mobileFormatOff(info.accountMobileNum),
    };
    mutateSigninAuth(dto, {
      onSuccess(res, variables, context) {
        const code = res.data.code;
        const data = res.data.data;
        if (code !== '0000') {
          toast?.on(msg.errMsg(code), 'warning');
          if (code === '9999') {
            hanbleClose();
            return;
          }
          return;
        } else {
          onOpenTextFiled();
          return;
        }
      },
      onError(error, variables, context) {
        toast?.on(
          '인증번호가 일치하지 않습니다 \n 잠시 후, 다시 시도해 주세요',
          'error',
        );
      },
    });
  }, [
    hanbleClose,
    info.accountMobileNum,
    msg,
    mutateSigninAuth,
    onOpenTextFiled,
    toast,
  ]);
  //휴대폰 인증 번호 검사
  const onClickMobileAuthVerify = useCallback(() => {
    const dto: SigninVerifyDto = {
      verificationCode: info.verificationCode,
      authenticationCode: authenticationCode,
    };
    mutateSigninAuthVerify(dto, {
      onSuccess(res, variables, context) {
        const code = res.data.code;
        const data = res.data.data;
        if (code !== '0000') {
          switch (code) {
            /// 가입 대기
            case '0050':
              onOpenProcess('not-approved');
              return;
            /// 휴면 상태
            case '0051':
              onOpenProcess('dormant');
              return;
            /// 운영팀에 의해 정지된 계정
            case '0055':
              onOpenProcess('disable');
              return;
            case '9999':
              hanbleClose();
              return;
            default:
              toast?.on(msg.errMsg(code), 'warning');
              return;
          }
        } else {
          const { accountUlid, service, refreshToken, accessToken } = data;
          setCookie('accessToken', accessToken);
          setCookie('refreshToken', refreshToken);
          const userinfo: UserInfoInterface = jwtDecode(accessToken as string);
          setInUserInfo(userinfo);
          onOpenModal();
          router.replace('/preparation/request');
          return;
        }
      },
    });
  }, [
    info.verificationCode,
    authenticationCode,
    mutateSigninAuthVerify,
    onOpenProcess,
    hanbleClose,
    toast,
    msg,
    setInUserInfo,
    onOpenModal,
    router,
  ]);

  return { onClickMobileAuthRequest, onClickMobileAuthVerify };
};

export default useMutationAuthentication;
