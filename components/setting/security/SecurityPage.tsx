import { WButton } from '@components/common/button/WButton';
import { WBoxLayout } from '@components/common/layouts/WLayout';
import WSubTitle from '@components/common/typography/WSubTitle';
import { Box, Typography } from '@mui/material';
import {
  FlexCenterC,
  FlexCenterR,
  FlexStartC,
  FlexStartR,
} from '@styles/flexGrid';

import { useCallback, useState } from 'react';
import SecurityDeleteCycleRodioGroup from './modules/SecurityDeleteCycleRodioGroup';
import SecurityEffectiveTimeRodioGroup from './modules/SecurityEffectiveTimeRodioGroup';

const SecurityPage = () => {
  const [validTime, setValidTime] = useState<string>('disable');
  const [validPeriod, setValidPeriod] = useState<string>('365');

  const onChengeTime = useCallback((value: string) => {
    setValidTime(value);
  }, []);
  const onChengePeriod = useCallback((value: string) => {
    setValidPeriod(value);
  }, []);

  const onClickFix = useCallback(() => {
    console.log('onClickFix');
  }, []);
  return (
    <FlexCenterC gap="26px">
      <WBoxLayout padding="38px" width="100%">
        <FlexStartC gap="16px">
          <WSubTitle title={'개인정보 처리 설정'}></WSubTitle>
        </FlexStartC>
        <Box height="40px" />
        <FlexStartR gap="200px">
          <SecurityEffectiveTimeRodioGroup
            onChangeValue={onChengeTime}
            value={validTime}
          />
          <SecurityDeleteCycleRodioGroup
            onChangeValue={onChengePeriod}
            value={validPeriod}
          />
        </FlexStartR>
      </WBoxLayout>
      <WButton
        onClick={onClickFix}
        variant="contained"
        sx={{
          width: '320px',
        }}
      >
        수정
      </WButton>
    </FlexCenterC>
  );
};

export default SecurityPage;
