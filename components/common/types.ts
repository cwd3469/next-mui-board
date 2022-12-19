import { AlertColor, Breakpoint, SxProps, Theme } from '@mui/material';

export interface WModalProps {
  handleClose?: () => void;
  subTitle?: string;
  title?: string;
  open: boolean;
  children: JSX.Element;
  maxWidth?: Breakpoint;
  bgDisable?: boolean;
  closeBtnOn?: boolean;
  titleSx?: SxProps<Theme>;
  style?: SxProps<Theme>;
}

export interface WAlertProps extends WModalProps {
  btnTitle?: string;
  btnColor?: string;
  btnTextColor?: string;
  disabled?: boolean;
  handleEvent?: () => void;
}

export interface WConfirmProps extends WAlertProps {
  closeBtnTitle?: string;
  closeBtnColor?: string;
  closeBtnEvent?: () => void;
}

export interface ToastType {
  type: AlertColor;
  msg: string;
}

export interface WSnackBarType extends ToastType {
  open: boolean;
  close: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}

export interface UseToastInterface {
  on: (msg: string, type: AlertColor) => void;
}

export interface WOptionType {
  id: string;
  name: string;
}
