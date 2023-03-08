import { Breakpoint, Stack } from '@mui/material';
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
    action,
    style,
  } = props;

  const contentsWidth = (Breakpoint: Breakpoint | undefined) => {
    switch (Breakpoint) {
      case 'xs':
        return '444px';
      case 'sm':
        return '500px';
      case 'md':
        return '720px';
      case 'xl':
        return '800px';
      case 'lg':
        return '1200px';
      default:
        return 'auto';
    }
  };

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
      {' '}
      {closeBtnOn ? <WModalClose onClick={handleClose} /> : ''}
      {title ? (
        <Stack
          gap="16px"
          padding="64px 40px 56px"
          sx={titleSx}
          width={contentsWidth(maxWidth)}
        >
          {title ? <WDialogTitle>{title}</WDialogTitle> : ''}
          {subTitle ? <WDialogContentText>{subTitle}</WDialogContentText> : ''}
        </Stack>
      ) : (
        ''
      )}
      <WDialogContent sx={{ width: contentsWidth(maxWidth) }}>
        <WDialogLayout>{children}</WDialogLayout>
      </WDialogContent>
      {action}
    </WDialog>
  );
};

WModal.defaultProps = {
  open: false,
};

export default WModal;
