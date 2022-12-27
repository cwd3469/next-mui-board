import { Box } from '@mui/material';
import { WLayout, Logo } from '../WLayout';
import GnbTimer from './GnbTimer';
import GnbMyInfo from './GnbMyInfo';
import { GnbExtensionButton } from './GnbButtons';
import { useCallback, useState } from 'react';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useRouter } from 'next/router';
import { FlexSpaceBetween, GnbNavList } from '../styled';

interface GnbBodyType {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
  disabled?: boolean;
}

const GnbBody = (props: GnbBodyType) => {
  const { children, disabled } = props;

  const toast = useToastContext();
  const [extension, setExtension] = useState<boolean>(false);
  const router = useRouter();

  const onClickExtension = useCallback(() => {
    let state = 200;
    let setting = true;
    if (state === 200) {
      if (!setting) {
        router.push('/doctor/setting');
        return;
      }
      if (extension) {
        setExtension(false);
      } else {
        setExtension(true);
      }
    } else {
      toast?.on(
        '접수 상태 변경에 실패하였습니다 \n 잠시 후, 다시 시도해 주세요',
        'error',
      );
    }
  }, [extension, router, toast]);

  return (
    <WLayout sx={{ padding: '11px 0' }}>
      <FlexSpaceBetween>
        <GnbNavList>
          <Logo />
          <Box width={'14px'} />
          {children}
        </GnbNavList>
        <GnbNavList>
          <GnbExtensionButton checked={extension} onClick={onClickExtension} />
          <GnbTimer />
          <GnbMyInfo disabled={disabled} />
        </GnbNavList>
      </FlexSpaceBetween>
    </WLayout>
  );
};
export default GnbBody;
