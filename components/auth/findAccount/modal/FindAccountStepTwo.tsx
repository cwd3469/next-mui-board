import React, { useCallback } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { ModalType } from '@components/common/layouts/gnb/types';
import { VerifyRes } from '../type';
import useChangePw from '@components/auth/hooks/useChangePw';
import { useToastContext } from '@hooks/utils/useToastContext';
import WConfirm from '@components/common/modals/WConfirm';
import {
  WPwTextField,
  WRepwTextField,
} from '@components/common/inputs/textField/modules';
import WSubTitle from '@components/common/typography/WSubTitle';

interface FindAccountStepTwoType extends ModalType {
  res?: VerifyRes;
}

const FindAccountStepTwo = (props: FindAccountStepTwoType) => {
  const { state, errs, disable, setInInfo, setInInfoErr } = useChangePw();
  const toast = useToastContext();
  const userId = 'test*****';
  const pwChangeEvent = useCallback(() => {
    const dto = {
      pw: state.pw,
      repw: state.repw,
    };
    let status = 200;
    if (status === 200) {
      props.handleClose();
      console.log(dto);
    } else {
      toast?.on('입력하신 비밀번호와 일치하지 않습니다.', 'error');
    }
  }, [props, state.pw, state.repw, toast]);

  return (
    <WConfirm
      open={props.open}
      handleClose={props.handleClose}
      handleEvent={pwChangeEvent}
      btnTitle={'비밀번호 변경'}
      disabled={disable}
      activeOn
      maxWidth={'xl'}
      title="계정 찾기"
    >
      <Stack width={'720px'} padding="0px 40px 124px">
        <Stack
          justifyContent="center"
          alignItems="center"
          bgcolor={'#f8f8f8'}
          padding="40px 40px 60px"
        >
          <Stack
            gap="20px"
            justifyContent="center"
            alignItems="center"
            width="560px"
          >
            <Typography
              variant="subtitle1"
              color="#4a4a4a"
              textAlign={'center'}
              fontWeight="400"
            >
              회원님의 아이디는{' '}
              <span style={{ color: '#4AC6FF' }}>{userId}</span> (으)로 등록되어
              있습니다
            </Typography>
            <Typography
              variant="body2"
              color="#999"
              textAlign={'center'}
              fontWeight="100"
            >
              * 개인정보 도용에 대한 피해 방지를 위하여 일부 아이디만
              노출됩니다.
            </Typography>
          </Stack>
          <Box margin="40px 0" width={'100%'} height="1px" bgcolor="#ebeced" />
          <Stack width="320px" gap="8px">
            <WSubTitle
              title={'비밀번호 변경'}
              sx={{
                '& .MuiTypography-root': {
                  fontSize: '16px',
                },
              }}
            />
            <Box width={'100%'} height="1px" />
            <WPwTextField
              state={state.pw}
              err={errs.pwErr}
              setState={setInInfo}
              setErr={setInInfoErr}
              keyId={'pw'}
            />

            <WRepwTextField
              pw={state.pw}
              state={state.repw}
              err={errs.repwErr}
              setState={setInInfo}
              setErr={setInInfoErr}
              keyId={'repw'}
            />
          </Stack>
        </Stack>
      </Stack>
    </WConfirm>
  );
};

export default FindAccountStepTwo;
