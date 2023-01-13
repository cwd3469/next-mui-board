import CheckIconActive from 'public/assets/icon/checkIconActive.svg';
import CheckIcon from 'public/assets/icon/checkIcon.svg';
import { WToggleButton } from '..';
import Image from 'next/image';

interface BusinessToggleType {
  title?: string;
  disabled?: boolean | undefined;
  selected?: boolean | undefined;
  onChange?:
    | ((event: React.MouseEvent<HTMLElement, MouseEvent>, value: any) => void)
    | undefined;
}

export const BusinessToggle = (props: BusinessToggleType) => {
  return (
    <WToggleButton
      value="check"
      color="primary"
      selected={props.selected}
      disabled={props.disabled}
      onChange={props.onChange}
      sx={{
        padding: '8px',
        gap: '4px',
        fontSize: '14px',
        boxSizing: 'border-box',
        borderWidth: '1px',
        height: '37px',
        '&.Mui-selected': {
          border: '1px solid #4ac6ff',
        },
        '&.Mui-disabled': {
          backgroundColor: '#ebeced',
        },
      }}
    >
      {props.title ? props.title : ''}
      {props.selected ? (
        <Image src={CheckIconActive} alt="체크" width={'12px'} />
      ) : (
        <Image src={CheckIcon} alt="체크" width={'12px'} />
      )}{' '}
    </WToggleButton>
  );
};
