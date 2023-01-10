import { useAuthFileUpload } from '@hooks/apis/auth/signup';
import { FileUid } from '@hooks/utils/fileUpload/types';
import useFileUpload from '@hooks/utils/fileUpload/useFileUpload';
import useValidation from '@hooks/utils/useValidation';
import { Box, Grid, Typography } from '@mui/material';
import { blobToFile, forinArr, resizeFileCompression } from '@utils/file';
import { ChangeEvent } from 'react';
import { DefaltInfo, SignupFileLadel, ImageView } from './styled';

export interface HospitalImgPickerType {
  modifyFile: File[];
  onDeleteLogoUid: () => void;
  onUploadFile: (uid: FileUid) => void;
  name: string;
}

const SignupFileUpload = (props: HospitalImgPickerType) => {
  const { modifyFile, onDeleteLogoUid, onUploadFile, name } = props;
  // const { mutate: mutateAuthFileUpload } = useAuthFileUpload();
  const vaild = useValidation();
  const { onChangeFile, onDeleteuidList, dragRef, isDragging, imageSrc, err } =
    useFileUpload({
      multi: false,
      modifyFile,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeFileLoad = async (e: ChangeEvent<HTMLInputElement> | any) => {
    const selectFile =
      e.type === 'drop' ? e.dataTransfer.files : e.target.files;
    const fileList = forinArr(selectFile);
    if (fileList.length) {
      const imgName = fileList[0].name;
      const item = fileList[0];
      const regBoo = vaild.regExpFile.test(item.type);
      let resizeFile = regBoo ? item : await resizeFileCompression(item);
      const img = blobToFile(resizeFile, imgName);
      const formData = new FormData();
      formData.append('file', img);
      const uid = { fileUlid: fileList[0].name, sort: 0 };
      onUploadFile(uid);
      onChangeFile(e);

      // mutateAuthFileUpload(formData, {
      //   onSuccess: (data) => {
      //     const { fileUlid } = data.data.data;
      //     const uid = { fileUlid: fileUlid, sort: 0 };
      //     onUploadFile(uid);
      //     onChangeFile(e);
      //   },
      // });
    }
  };

  return (
    <Grid container flexDirection="column">
      <input
        onChange={onChangeFileLoad}
        type="file"
        id={name}
        style={{ display: 'none' }}
        accept=".jpg,.png,.jpeg"
        multiple={false}
      />
      <Box height="10px" />
      <Grid container gap="10px" justifyContent={'flex-start'}>
        {imageSrc.length ? (
          imageSrc.map((img, inx) => {
            return (
              <ImageView
                key={inx}
                inx={inx}
                img={img}
                deleteImg={(index: number) => {
                  onDeleteuidList(index);
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
            );
          })
        ) : (
          <SignupFileLadel
            className={isDragging ? 'drag-in' : 'drag-out'}
            ref={dragRef}
            htmlFor={name}
          >
            <DefaltInfo
              sx={{
                '& .uploadBtn': {
                  marginTop: '25px',
                },
              }}
            />
          </SignupFileLadel>
        )}
      </Grid>
      <Box height="5px" />
      <Box width="100%" height="12px">
        <Typography color="red" lineHeight="1">
          {err.boo ? err.msg : ''}
        </Typography>
      </Box>
    </Grid>
  );
};

export default SignupFileUpload;
