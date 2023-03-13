import upload from 'public/assets/icon/fetherLogOut.svg';
import closeIcon from 'public/assets/icon/closeIcon.svg';
import {
  Box,
  Button,
  Grid,
  Stack,
  styled,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { UidList } from '@hooks/utils/fileUpload/types';
import WPdfPreView from '@components/common/image/WPdfPreView';

export const SignupFileLadel = styled('label')`
  width: 200px;
  height: 300px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  text-align: center;
  flex-direction: column;
  gap: 10px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='%23848484FF' stroke-width='1' stroke-dasharray='6%2c 4' stroke-dashoffset='3' stroke-linecap='square'/%3e%3c/svg%3e");
  &.drag-in {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='%234AC6FFFF' stroke-width='1' stroke-dasharray='6%2c 4' stroke-dashoffset='3' stroke-linecap='square'/%3e%3c/svg%3e");
  }
`;
export const UploadBtn = styled(Grid)(({ theme }) => ({
  backgroundColor: '#fff',
  border: '1px solid #DBDBDB',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 10px',
  borderRadius: '6px',
  gap: '6px',
}));

const DeleteBtn = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.5);',
  width: '32px',
  height: '32px',
  padding: '3px',
  minWidth: 'auto',
  borderRadius: '0px 6px 0px 0px',
  position: 'absolute',
  right: '0',
  '&:hover': {
    backgroundColor: '#999',
  },
}));

export const DefaltInfo = (props: { sx?: SxProps<Theme> }) => {
  return (
    <Stack alignItems="center" gap="10px" sx={props.sx}>
      <Typography
        className="fileDrag"
        variant="body1"
        color="#666"
        lineHeight={'1'}
      >
        파일을 드래그 해보세요.
      </Typography>
      <Typography
        className="fileImage"
        variant="caption"
        color="#999"
        lineHeight={'1.3'}
        width="100%"
      >
        파일 형식 JPG,PNG,PDF
      </Typography>
      <UploadBtn className="uploadBtn">
        <Image src={upload} alt="업로드" width="15px" />
        <Typography
          variant="caption"
          color="#333"
          lineHeight={'1'}
          sx={{
            fontSize: '12px',
            fontWeight: '500',
          }}
        >
          파일 등록하기
        </Typography>
      </UploadBtn>
    </Stack>
  );
};

export const ImageView = (props: {
  inx: number;
  file: File;
  img: UidList | UidList;
  deleteImg: (index: number) => void;
  sx?: SxProps<Theme>;
}) => {
  const { inx, img, deleteImg, sx, file } = props;
  return (
    <Grid
      flexDirection="column"
      container
      key={inx}
      sx={{
        position: 'relative',
        width: '240px',
        height: '115px',
        borderRadius: '6px',
        border: '1px solid #eee',
        overflow: 'hidden',
        ...sx,
      }}
    >
      {img.type == 'application/pdf' ? (
        <Box
          sx={{
            '& .react-pdf__Page__canvas': {
              width: '200px !important',
              height: '300px !important',
            },
          }}
        >
          <WPdfPreView pdf={file} />
        </Box>
      ) : (
        <Image src={img.url} alt="이미지" layout="fill" objectFit="cover" />
      )}

      <DeleteBtn
        className="deleteBtn"
        onClick={() => {
          deleteImg(img.index);
        }}
      >
        <Box width="24px" height="24px" position={'relative'}>
          <Image src={closeIcon} alt="로고 취소" layout="fill" />
        </Box>
      </DeleteBtn>
    </Grid>
  );
};
