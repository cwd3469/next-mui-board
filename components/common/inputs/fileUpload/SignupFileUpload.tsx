/* eslint-disable @typescript-eslint/no-explicit-any */
import useFileUpload from '@hooks/utils/fileUpload/useFileUpload';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { blobToFile, forinArr, resizeFileCompression } from '@utils/file';
import { ChangeEvent, useCallback, useEffect } from 'react';
import { DefaltInfo, SignupFileLadel, ImageView } from './styled';

export interface HospitalImgPickerType {
  onDeleteLogoUid: () => void;
  onUploadFile: (file: File) => void;
  name: string;
}

const SignupFileUpload = (props: HospitalImgPickerType) => {
  const { onDeleteLogoUid, onUploadFile, name } = props;

  const onChangeFileLoad = useCallback(
    async (
      e: ChangeEvent<HTMLInputElement> | any,
      fileLoader: (event: ChangeEvent<HTMLInputElement> | any) => void,
    ) => {
      const selectFile =
        e.type === 'drop' ? e.dataTransfer.files : e.target.files;
      const fileList = forinArr(selectFile);
      if (fileList.length) {
        const imgName = fileList[0].name;
        const item: File = fileList[0];
        let imageImg =
          item.type === 'application/pdf'
            ? item
            : item.size < 1000000
            ? item
            : await resizeFileCompression(item);
        const img = blobToFile(imageImg, imgName);
        onUploadFile(img);
        fileLoader(e);
      }
    },
    [onUploadFile],
  );

  const fileUploadHook = useFileUpload({
    onfileUpload: onChangeFileLoad,
  });

  return (
    <Grid container flexDirection="column">
      <input
        onChange={fileUploadHook.onChangeFile}
        type="file"
        id={name}
        style={{ display: 'none' }}
        accept=".jpg,.png,.jpeg,.pdf"
        multiple={false}
      />

      <Grid container gap="10px" justifyContent={'flex-start'}>
        {fileUploadHook.imageSrc.length ? (
          fileUploadHook.imageSrc.map((img, inx) => {
            return (
              <Stack key={inx}>
                <Typography
                  variant="body1"
                  fontWeight={'100'}
                  color="#333"
                  sx={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    width: '200px',
                    height: '20px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {img.id}
                </Typography>
                <Box height="22px" />
                <ImageView
                  inx={inx}
                  img={img}
                  file={fileUploadHook.files[0]}
                  deleteImg={(index: number) => {
                    fileUploadHook.onDeleteuidList(index);
                    onDeleteLogoUid();
                  }}
                  sx={{
                    height: '300px',
                    width: '200px',
                    '& .wimageBox': {
                      height: '300px',
                      width: '200px',
                    },
                  }}
                />
              </Stack>
            );
          })
        ) : (
          <Stack>
            <Box height="40px" />
            <SignupFileLadel
              className={fileUploadHook.isDragging ? 'drag-in' : 'drag-out'}
              ref={fileUploadHook.dragRef}
              htmlFor={name}
            >
              <DefaltInfo
                sx={{
                  '& .uploadBtn': {
                    marginTop: '15px',
                  },
                }}
              />
            </SignupFileLadel>
          </Stack>
        )}
      </Grid>
      <Box height="5px" />
      <Box width="100%" height="12px">
        <Typography color="red" lineHeight="1">
          {fileUploadHook.err.boo ? fileUploadHook.err.msg : ''}
        </Typography>
      </Box>
    </Grid>
  );
};

export default SignupFileUpload;
