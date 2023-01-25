import WDownloadBtn from '@components/common/button/modules/WDownloadBtn';
import { ModalType } from '@components/common/layouts/gnb/types';
import WAlert from '@components/common/modals/WAlert';
import WConfirm from '@components/common/modals/WConfirm';
import usePrescriptionImage from '@hooks/apis/preparation/history/hooks/usePrescriptionImage';
import { Box, Grid, Stack } from '@mui/material';
import Image from 'next/image';

interface PrescriptionModalType extends ModalType {
  id: string;
}

const PrescriptionModal = (props: PrescriptionModalType) => {
  const { open, handleClose, id } = props;
  const { file } = usePrescriptionImage({ id });
  return (
    <WConfirm
      open={open}
      handleClose={handleClose}
      title="처방전 보기"
      maxWidth="xl"
      titleSx={{ padding: '50px 0px 16px' }}
      btnTitle="인쇄하기"
      activeOn
    >
      <Stack gap="16px" padding="0px 40px">
        <Grid container justifyContent="flex-end">
          <WDownloadBtn
            failed={false}
            download={''}
            url={'data:application/octet-stream;base64,' + file}
            sx={{
              height: '40px !important',
              width: '100px !important',
            }}
          />
        </Grid>
        {file ? (
          <Box sx={{ height: '900px', position: 'relative' }}>
            <Image src={file} alt="처방전" layout="fill" />
          </Box>
        ) : (
          <Stack height="500px"></Stack>
        )}
        <Box height="58px" />
      </Stack>
    </WConfirm>
  );
};

export default PrescriptionModal;
