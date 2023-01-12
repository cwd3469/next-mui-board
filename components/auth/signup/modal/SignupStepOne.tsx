import { TermsButton, TermsCheckBox, TermsGrid } from '../styled';
import { ModalType } from '@components/common/layouts/gnb/types';
import WAlert from '@components/common/modals/WAlert';
import WSubTitle from '@components/common/typography/WSubTitle';
import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import useTerms from '../../hooks/useTerms';
import SignupTerms from './SignupTerms';
import SignupStepTwo from './SignupStepTwo';

const SignupStepOne = (props: ModalType) => {
  const {
    agreeAll,
    agreeTermA,
    agreeTermB,
    agreeTermC,
    disabled,
    onCheckBoxA,
    onCheckBoxB,
    onCheckBoxC,
    onClickReset,
    onCheckAllAgree,
  } = useTerms();
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [termsOn, setTermsOn] = useState<boolean>(false);
  const [bgDisable, setBgDisable] = useState<boolean>(false);

  const onCloseModal = () => {
    onClickReset();
    props.handleClose();
    setBgDisable(false);
    setTermsOn(false);
    setModalOn(false);
  };
  const onOpenTerms = () => {
    setTermsOn(true);
    setBgDisable(true);
  };
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
      disabled={disabled}
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
              <TermsCheckBox checked={agreeAll} onChange={onCheckAllAgree} />
              <WSubTitle title="전체 동의 하기" onClick={onCheckAllAgree} />
            </TermsGrid>
          </TermsGrid>
          <TermsGrid padding={'24px 24px'}>
            <TermsGrid gap="16px">
              <TermsCheckBox
                checked={agreeTermA}
                onChange={() => onCheckBoxA(agreeTermA)}
              />
              <WSubTitle
                title="서비스 이용약관 동의"
                onClick={() => onCheckBoxA(agreeTermA)}
                require
              />
            </TermsGrid>
            <TermsButton onClick={onOpenTerms}>전문보기</TermsButton>
          </TermsGrid>
          <TermsGrid padding={'24px 24px'}>
            <TermsGrid gap="16px">
              <TermsCheckBox
                checked={agreeTermB}
                onChange={() => onCheckBoxB(agreeTermB)}
              />
              <WSubTitle
                title="개인정보 보호 의무 동의"
                onClick={() => onCheckBoxB(agreeTermB)}
                require
              />
            </TermsGrid>
            <TermsButton onClick={onOpenTerms}>전문보기</TermsButton>
          </TermsGrid>
          <TermsGrid padding={'24px 24px'}>
            <TermsGrid gap="16px">
              <TermsCheckBox
                checked={agreeTermC}
                onChange={() => onCheckBoxC(agreeTermC)}
              />
              <WSubTitle
                title="개인정보 처리 방침 동의"
                require
                onClick={() => onCheckBoxC(agreeTermC)}
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
