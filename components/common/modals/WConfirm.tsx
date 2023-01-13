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
    activeOn,
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
            className="closeBtn"
            variant="contained"
            color="info"
            onClick={closeBtnEvent ? closeBtnEvent : handleClose}
          >
            {closeBtnTitle ? closeBtnTitle : '닫기'}
          </ModalButton>
          <ModalButton
            className={`actionBtn ${activeOn ? 'active' : ''} ${
              typeof disabled !== 'undefined' ? 'active' : ''
            }`}
            disabled={disabled ? disabled : false}
            variant="contained"
            onClick={handleEvent ? handleEvent : handleClose}
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
