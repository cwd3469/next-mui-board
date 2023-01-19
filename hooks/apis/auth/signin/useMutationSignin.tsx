import { SigninDto, SigninState } from '@components/auth/signin/type';
import { UserInfoInterface } from '@components/auth/types';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { setCookie } from 'cookies-next';
import jwtDecode from 'jwt-decode';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { apiSignin } from './index';

interface UseMutationSignin {
  info: SigninDto;
  onOpenModal: (label: SigninState) => void;
  setTokenList: React.Dispatch<
    React.SetStateAction<{
      accessToken: string;
      refreshToken: string;
    }>
  >;
}

const useMutationSignin = (props: UseMutationSignin) => {
  const { info, onOpenModal, setTokenList } = props;
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const { mutate: mutateSignin } = useMutation(apiSignin);
  const [siginInfo, setSignInfo] = useState<SigninDto>();

  const onClickSignin = useCallback(() => {
    if (siginInfo) {
      setCookie('accountId', siginInfo.accountId);
      setCookie('hospitalCode', siginInfo.hospitalCode);
      mutateSignin(siginInfo, {
        onSuccess: (res) => {
          const code = res.data.code;
          if (code !== '0000') {
            if (code === '0050' || code === '0051' || code === '0055') {
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
                default:
                  return;
              }
            } else {
              toast?.on(msg.errMsg(code), 'warning');
            }
          } else {
            const userInfo: UserInfoInterface = jwtDecode(
              res.data.data?.accessToken,
            );
            /// 비밀번호 발급 기간이 90일 초과일때
            if (!userInfo.credentialsNonExpired) {
              onOpenModal('excess');
              return;
            }
            /// 임시 비밀번호 발급 상태
            if (userInfo.needResetPassword) {
              onOpenModal('first');
              return;
            }
            onOpenModal('success');
            setTokenList({
              accessToken: res.data.data?.accessToken,
              refreshToken: res.data.data?.refreshToken,
            });
            return;
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (errMsg: any) => {
          if (errMsg) {
            toast?.on(`아이디 또는 비밀번호를 확인해 주세요.`, 'error');
          }
        },
      });
    }
  }, [msg, mutateSignin, onOpenModal, setTokenList, siginInfo, toast]);
  /**회원가입 신청 이벤트 */

  useEffect(() => {
    if (info) {
      setSignInfo(info);
    }
  }, [info]);

  return { onClickSignin };
};

export default useMutationSignin;
