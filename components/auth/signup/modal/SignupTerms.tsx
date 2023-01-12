import { Box, Stack, Typography } from '@mui/material';
import WAlert from '@components/common/modals/WAlert';
import { ModalType } from '@components/common/layouts/gnb/types';

const SignupTerms = (props: ModalType) => {
  const { open, handleClose } = props;

  return (
    <WAlert
      open={open}
      handleClose={handleClose}
      maxWidth="xl"
      activeOn
      btnTextColor="#999"
      title=" 서비스 이용약관 동의"
    >
      <Stack alignItems={'center'} padding="0px 40px">
        <Box
          width={'640px'}
          height={'420px'}
          sx={{ overflowY: 'scroll' }}
          padding={'10px'}
        >
          <Box>서비스 이용약관 동의 전체 내용입니다.</Box>
        </Box>
        <Box height="41px" />
      </Stack>
    </WAlert>
  );
};

export default SignupTerms;
