import Link from 'next/link';
import GnbBody from './GnbBody';
import { GnbItem } from '../styled';
import { useGnb } from './useGnb';

export const Gnb = (props: { disabled?: boolean }) => {
  const { disabled } = props;
  const { itmeMenuActive, activeChildren } = useGnb();

  return (
    <GnbBody disabled={disabled}>
      <>
        <GnbItem sx={itmeMenuActive('')} disabled={disabled}>
          <Link href="/">조제 요청</Link>
        </GnbItem>
        <GnbItem sx={itmeMenuActive('queueing')} disabled={disabled}>
          <Link href="/">조제 진행</Link>
        </GnbItem>
        <GnbItem
          sx={activeChildren('history-detail', 'history', 3)}
          disabled={disabled}
        >
          <Link href="/">조제 내역</Link>
        </GnbItem>
        <GnbItem sx={itmeMenuActive('certification')} disabled={disabled}>
          <Link href="/">영업시간 설정</Link>
        </GnbItem>
        <GnbItem sx={itmeMenuActive('certification')} disabled={disabled}>
          <Link href="/">보안 설정</Link>
        </GnbItem>
        <GnbItem
          sx={activeChildren('doctor-set', 'treatment-set', 2)}
          disabled={disabled}
        >
          <Link href="/">공지사항</Link>
        </GnbItem>
      </>
    </GnbBody>
  );
};
