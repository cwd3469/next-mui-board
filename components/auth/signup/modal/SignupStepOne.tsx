import { TermsButton, TermsCheckBox, TermsGrid } from '../styled';
import { ModalType } from '@components/common/layouts/gnb/types';
import WAlert from '@components/common/modals/WAlert';
import WSubTitle from '@components/common/typography/WSubTitle';
import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import useTerms from '../../hooks/useTerms';
import SignupTerms from './SignupTerms';
import SignupStepTwo from './SignupStepTwo';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  subTitle: {
    '& .wSubTitle-title': { fontWeight: '400', color: '#333' },
    '& .wSubTitle-require': { fontSize: '18px' },
  },
  allInAgree: {
    '& .wSubTitle-title': {
      fontSize: '20px',
    },
  },
}));

const SignupStepOne = (props: ModalType) => {
  const termHook = useTerms();
  const classes = useStyles();
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [termsOn, setTermsOn] = useState<boolean>(false);
  const [bgDisable, setBgDisable] = useState<boolean>(false);

  /** SignupStepOne off 기능*/
  const onCloseModal = () => {
    termHook.onClickReset();
    props.handleClose();
    setBgDisable(false);
    setTermsOn(false);
    setModalOn(false);
  };
  /**SignupStepOne 약관 모달 on 기능 */
  const onOpenTerms = () => {
    setTermsOn(true);
    setBgDisable(true);
  };
  /** SignupStepOne 약관 모달 off 기능*/
  const onCloseTerms = () => {
    setTermsOn(false);
    setBgDisable(false);
  };

  return (
    <WAlert
      open={props.open}
      handleClose={onCloseModal}
      handleEvent={() => {
        setModalOn(true);
        setBgDisable(true);
      }}
      disabled={termHook.disabled}
      bgDisable={bgDisable}
      maxWidth="xl"
      activeOn
      btnTitle="다음"
      title="가입 안내"
      closeBtnOn
    >
      <Stack sx={{ width: '720px', padding: '0px 40px' }}>
        <Typography variant="subtitle1" fontWeight={'400'}>
          어디 아파에 오신 약국 사용자님 반갑습니다.
        </Typography>
        <Box height="10px" />
        <Typography variant="h5">안전한 서비스 사용을 위해</Typography>
        <Typography variant="h5">
          서비스 약관 정보 제공 동의를 해주세요.
        </Typography>
        <Box paddingTop={'40px'} />
        <Stack border="1px solid #ebeced">
          <TermsGrid padding={'24px 24px'} borderBottom="1px solid #ebeced">
            <TermsGrid gap="16px">
              <TermsCheckBox
                checked={termHook.agreeAll}
                onChange={termHook.onCheckAllAgree}
              />
              <WSubTitle
                title="전체 동의 하기"
                className={`${classes.allInAgree} ${classes.subTitle}`}
                onClick={termHook.onCheckAllAgree}
              />
            </TermsGrid>
          </TermsGrid>
          <TermsGrid padding={'24px 24px'}>
            <TermsGrid gap="16px">
              <TermsCheckBox
                checked={termHook.agreeTermA}
                onChange={() => termHook.onCheckBoxA(termHook.agreeTermA)}
              />
              <WSubTitle
                title="서비스 이용약관 동의"
                className={classes.subTitle}
                onClick={() => termHook.onCheckBoxA(termHook.agreeTermA)}
                require
              />
            </TermsGrid>
            <TermsButton onClick={onOpenTerms}>전문보기</TermsButton>
          </TermsGrid>
          <TermsGrid padding={'24px 24px'}>
            <TermsGrid gap="16px">
              <TermsCheckBox
                checked={termHook.agreeTermB}
                onChange={() => termHook.onCheckBoxB(termHook.agreeTermB)}
              />
              <WSubTitle
                title="개인정보 보호 의무 동의"
                className={classes.subTitle}
                onClick={() => termHook.onCheckBoxB(termHook.agreeTermB)}
                require
              />
            </TermsGrid>
            <TermsButton onClick={onOpenTerms}>전문보기</TermsButton>
          </TermsGrid>
          <TermsGrid padding={'24px 24px'}>
            <TermsGrid gap="16px">
              <TermsCheckBox
                checked={termHook.agreeTermC}
                onChange={() => termHook.onCheckBoxC(termHook.agreeTermC)}
              />
              <WSubTitle
                title="개인정보 처리 방침 동의"
                className={classes.subTitle}
                require
                onClick={() => termHook.onCheckBoxC(termHook.agreeTermC)}
              />
            </TermsGrid>
            <TermsButton onClick={onOpenTerms}>전문보기</TermsButton>
          </TermsGrid>
        </Stack>
        <Box height="100px" />
        <SignupTerms open={termsOn} handleClose={onCloseTerms} />
        <SignupStepTwo open={modalOn} handleClose={onCloseModal} />
      </Stack>
    </WAlert>
  );
};

export default SignupStepOne;
