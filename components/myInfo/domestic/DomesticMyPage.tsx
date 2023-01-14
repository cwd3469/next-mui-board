import { WBoxLayout } from '@components/common/layouts/WLayout';
import WMainTitle from '@components/common/typography/WMainTitle';
import { Box, Grid, Stack, Typography } from '@mui/material';
import {
  FlexCenterC,
  FlexCenterR,
  FlexStartC,
  FlexStartR,
} from '@styles/flexGrid';
import MyinfoTextBox from '../modules/MyinfoTextBox';

const DomesticMyPage = () => {
  const data = {
    pharmacyName: '서울메디컬정형외과',
    pharmacyAddress:
      '서울특별시 강남구 논현동 200-40 옆골목 맨끝집 어반하이브 10층 ',
    pharmacyPhone: '0233033301',
    pharmacyFaxNumber: '0233033301',
    pharmacistName: '김제니',
    pharmacistMobile: '01033042208',
    bankAccount: '11045678987654',
  };
  return (
    <FlexCenterC gap="26px">
      <WMainTitle title="내 정보" />
      <WBoxLayout padding="32px" width="100%">
        <Grid
          container
          width="100%"
          sx={{ alignItems: 'flex-start', gap: '178px' }}
        >
          <FlexStartC gap="24px">
            <MyinfoTextBox title="약국 명">{data.pharmacyName}</MyinfoTextBox>
            <MyinfoTextBox title="약국 주소">
              {data.pharmacyAddress}
            </MyinfoTextBox>
            <MyinfoTextBox title="약국 전화번호">
              {data.pharmacyPhone}
            </MyinfoTextBox>
            <MyinfoTextBox title="약국 팩스번호">
              {data.pharmacyFaxNumber}
            </MyinfoTextBox>
          </FlexStartC>
          <FlexStartC gap="24px">
            <MyinfoTextBox title="약국 이름">
              {data.pharmacistName}
            </MyinfoTextBox>
            <MyinfoTextBox title="휴대폰 번호">
              {data.pharmacistMobile}
            </MyinfoTextBox>
            <MyinfoTextBox title="은행 계좌번호">
              {data.bankAccount}
            </MyinfoTextBox>
          </FlexStartC>
        </Grid>
        <Grid paddingTop="24px">
          <MyinfoTextBox
            title="고객센터"
            sx={{
              width: '100%',
              '& .MuiBox-root': {
                padding: '20px 20px 40px',
              },
            }}
          >
            <FlexStartC gap="24px">
              <Typography variant="body2" color="#575f6a">
                정보 변경이 필요하시면 고객센터로 문의주세요.
              </Typography>
              <FlexCenterR gap="8px">
                <Typography color="#575f6a" variant="h5">
                  1533-1451
                </Typography>
                <Typography color="#575f6a">
                  (09:00 ~ 18:00 / 토, 일, 공휴일 휴무)
                </Typography>
              </FlexCenterR>
            </FlexStartC>
          </MyinfoTextBox>
        </Grid>
      </WBoxLayout>
    </FlexCenterC>
  );
};

export default DomesticMyPage;
