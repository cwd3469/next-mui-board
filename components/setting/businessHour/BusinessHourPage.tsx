import { WButton } from '@components/common/button/WButton';
import { WBoxLayout } from '@components/common/layouts/WLayout';
import { Box, Typography } from '@mui/material';
import { FlexCenterC, FlexStartC, FlexStartR } from '@styles/flexGrid';
import { WeekendDto, WeekDataBundle } from './type';
import BusinessWeekForm from './modules/BusinessWeekForm';
import { useEffect, useState } from 'react';
import useBusinesssSet from '@hooks/apis/setting/biseness/useBusinesssSet';
import { forinArr } from '@utils/file';
import { stringToDate } from '@utils/date';
import WSubTitle from '@components/common/typography/WSubTitle';
import useMutationPharmacyProflie from '@hooks/apis/setting/biseness/useMutationPharmacyProflie';

const BusinessHourPage = () => {
  const { businessData, weeks } = useBusinesssSet();

  const [pharmacyUlid, setPharmacyUlid] = useState<string>('');
  const [weekList, setWeekList] = useState<WeekDataBundle | undefined>();
  const [startWeek, setStartWeek] = useState<WeekendDto[]>([]);
  const [endWeek, setEndWeek] = useState<WeekendDto[]>([]);
  const { onClickPharmacyProflieModify } = useMutationPharmacyProflie({
    weekList,
    pharmacyUlid,
  });

  const onChangeWeekList = (value: WeekendDto, keyId: string) => {
    setWeekList((prec) => {
      if (prec) return { ...prec, [keyId]: value };
    });
  };

  useEffect(() => {
    if (businessData) {
      if (businessData.pharmacyUlid) {
        setPharmacyUlid(businessData.pharmacyUlid);
      }
      const data: WeekDataBundle = {
        mondayOperation: businessData.mondayOperation,
        tuesdayOperation: businessData.tuesdayOperation,
        wednesdayOperation: businessData.wednesdayOperation,
        thursdayOperation: businessData.thursdayOperation,
        fridayOperation: businessData.fridayOperation,
        saturdayOperation: businessData.saturdayOperation,
        sundayOperation: businessData.sundayOperation,
        holidayOperation: businessData.holidayOperation,
      };

      const arr: WeekendDto[] = forinArr(data);
      const start: WeekendDto[] = arr.filter((item, index) => index <= 3);
      const end: WeekendDto[] = arr.filter((item, index) => index > 3);

      setStartWeek(start);
      setEndWeek(end);
      setWeekList(data);
    }
  }, [businessData]);

  return (
    <FlexCenterC gap="26px">
      <WBoxLayout padding="38px" width="100%">
        {weekList ? (
          <>
            <FlexStartC gap="14px">
              <WSubTitle title="요일별 영업 시간 유무 설정" />
              <Typography variant="body2" fontWeight="400" lineHeight="22px">
                해당 약국의 영업 시작 시간을 설정해 주세요.
              </Typography>
            </FlexStartC>
            <Box height="40px" />
            <FlexStartR gap="70px">
              <FlexStartC gap="40px">
                {startWeek
                  ? startWeek.map((item, index) => {
                      const week = weeks[index];
                      return (
                        <BusinessWeekForm
                          key={index}
                          week={week.en}
                          name={week.ko}
                          open={item.hasOperation}
                          openTime={stringToDate(item.openTime)}
                          closeTime={stringToDate(item.closeTime)}
                          setWeekOnChange={onChangeWeekList}
                        />
                      );
                    })
                  : ''}
              </FlexStartC>
              <FlexStartC gap="40px">
                {endWeek
                  ? endWeek.map((item, index) => {
                      const week = weeks[index + 4];
                      return (
                        <BusinessWeekForm
                          key={index}
                          week={week.en}
                          name={week.ko}
                          open={item.hasOperation}
                          openTime={stringToDate(item.openTime)}
                          closeTime={stringToDate(item.closeTime)}
                          setWeekOnChange={onChangeWeekList}
                        />
                      );
                    })
                  : ''}
              </FlexStartC>
            </FlexStartR>
          </>
        ) : (
          ''
        )}
      </WBoxLayout>
      <WButton
        onClick={onClickPharmacyProflieModify}
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

export default BusinessHourPage;
