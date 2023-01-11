import { ModalButton, WDialogActions } from './styled';
import WModal from './WModal';
import { WConfirmProps } from './types';

export const WConfirm = (props: WConfirmProps) => {
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
    btnTitle,
    btnColor,
    btnTextColor,
    disabled,
    handleEvent,
    // confirm
    closeBtnEvent,
    closeBtnTitle,
    closeBtnColor,
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
            variant="contained"
            color="info"
            onClick={closeBtnEvent ? closeBtnEvent : handleClose}
            sx={{
              backgroundColor: closeBtnColor ? closeBtnColor : '#c1c1c1',
            }}
          >
            {closeBtnTitle ? closeBtnTitle : '닫기'}
          </ModalButton>
          <ModalButton
            disabled={disabled ? disabled : false}
            variant="contained"
            color="info"
            onClick={handleEvent ? handleEvent : handleClose}
            sx={{
              backgroundColor: btnColor,
              color: btnTextColor ? btnTextColor : '#fff',
            }}
          >
            {btnTitle ? btnTitle : '확인'}
          </ModalButton>
        </WDialogActions>
      }
    >
      {children}
    </WModal>
  );
};

WConfirm.defaultProps = {
  open: false,
};

export default WConfirm;
