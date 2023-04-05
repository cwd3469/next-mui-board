import { WIconButton } from '@components/common/button/modules/WIconButton';
import WConfirm from '@components/common/modals/WConfirm';
import { OneImagePreviewComponent } from '@hooks/utils/fileUpload/usePrescriptionPreview';
import { Box, Grid, Stack } from '@mui/material';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import Image from 'next/image';
import resetIcon from 'public/assets/icon/zoom/reset-icon.svg';
import zoomInIcon from 'public/assets/icon/zoom/zoom-in.svg';
import zoomOutIcon from 'public/assets/icon/zoom/zoom-out.svg';
import WDownloadBtn from '@components/common/button/modules/WDownloadBtn';
import { printShow } from '@utils/file';
import { FileInfo } from '@hooks/utils/fileUpload/types';

const PrescriptionPreviewView = (props: {
  open: boolean;
  fileArr: File[];
  imageUrl: FileInfo[];
  patientInfo: string;
  reset: () => void;
}) => {
  const { fileArr, imageUrl, reset, open } = props;

  /**PrescriptionPreviewModal render */
  return (
    <WConfirm
      open={open}
      handleClose={reset}
      handleEvent={() => {
        printShow(`${imageUrl[0].src}`);
      }}
      title="처방전 보기"
      maxWidth="xl"
      titleSx={{ padding: '50px 0px 16px' }}
      btnTitle="인쇄하기"
      activeOn
    >
      <>
        <TransformWrapper initialScale={1}>
          {({ zoomIn, zoomOut, resetTransform, centerView, ...rest }) => (
            <Stack gap="10px">
              <Grid container justifyContent="end" gap="10px">
                {imageUrl.length ? (
                  <WDownloadBtn
                    failed={false}
                    download={`${props.patientInfo}_${imageUrl[0].name}`}
                    url={`${imageUrl[0].src}`}
                  />
                ) : (
                  ''
                )}
                <WIconButton
                  onClick={() => zoomIn()}
                  startIcon={<Image src={zoomInIcon} alt="zoomIn" />}
                >
                  파일 확대
                </WIconButton>
                <WIconButton
                  onClick={() => zoomOut()}
                  startIcon={<Image src={zoomOutIcon} alt="zoomIn" />}
                >
                  파일 축소
                </WIconButton>
                <WIconButton
                  onClick={() => resetTransform()}
                  startIcon={<Image src={resetIcon} alt="zoomIn" />}
                >
                  초기화
                </WIconButton>
              </Grid>
              <Grid
                container
                justifyContent="center"
                sx={{
                  position: 'relative',
                  height: '1000px',
                }}
              >
                <TransformComponent>
                  <OneImagePreviewComponent
                    fileArr={fileArr}
                    imageUrl={imageUrl}
                  />
                </TransformComponent>
              </Grid>
            </Stack>
          )}
        </TransformWrapper>
        <Box height="60px" />
      </>
    </WConfirm>
  );
};

export default PrescriptionPreviewView;
