import { Stack } from '@mui/material';
import { WModalProps } from './types';
import {
  WDialog,
  WDialogContent,
  WDialogContentText,
  WDialogLayout,
  WDialogTitle,
  WModalClose,
} from './styled';
import React from 'react';

const WModal = (props: WModalProps) => {
  const {
    open,
    handleClose,
    children,
    subTitle,
    title,
    maxWidth,
    bgDisable,
    closeBtnOn,
    titleSx,
    style,
  } = props;

  return (
    <WDialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: bgDisable
            ? 'rgba(0, 0, 0, 0)'
            : 'rgba(0, 0, 0, 0.5)',
        },
        ...style,
      }}
    >
      {title ? (
        <Stack gap="8px" padding="50px 40px 48px" sx={titleSx}>
          {title ? <WDialogTitle>{title}</WDialogTitle> : ''}
          {subTitle ? <WDialogContentText>{subTitle}</WDialogContentText> : ''}
        </Stack>
      ) : (
        ''
      )}
      <WDialogContent>
        <WDialogLayout>{children}</WDialogLayout>
      </WDialogContent>
      {closeBtnOn ? <WModalClose onClick={handleClose} /> : ''}
    </WDialog>
  );
};

WModal.defaultProps = {
  open: false,
};

export default WModal;
