import { Stack } from '@mui/material';
import { ModalButton, WDialog, WDialogActions } from './styled';
import WModal from './WModal';
import { WAlertProps } from './types';

const WAlert = (props: WAlertProps) => {
  const {
    // modal
    handleClose,
    subTitle,
    title,
    open,
    children,
    maxWidth,
    bgDisable,
    closeBtnOn,
    titleSx,
    style,
    // alert
    activeOn,
    btnTitle,
    btnTextColor,
    disabled,
    handleEvent,
  } = props;

  return (
    <WModal
      handleClose={handleClose}
      subTitle={subTitle}
      title={title}
      open={open}
      maxWidth={maxWidth}
      bgDisable={bgDisable}
      closeBtnOn={closeBtnOn}
      titleSx={titleSx}
      style={style}
      action={
        <WDialogActions>
          <ModalButton
            className={`actionBtn ${activeOn ? 'active' : ''} ${
              typeof disabled !== 'undefined' ? 'active' : ''
            }`}
            disabled={disabled ? disabled : false}
            variant="contained"
            color="info"
            onClick={handleEvent ? handleEvent : handleClose}
            sx={{
              width: '100%',
            }}
          >
            {btnTitle ? btnTitle : '닫기'}
          </ModalButton>
        </WDialogActions>
      }
    >
      {children}
    </WModal>
  );
};

WAlert.defaultProps = {
  open: false,
};

export default WAlert;
