import { BoxDisabledText } from '@components/common/box/modules/TextBox';
import { ModalType } from '@components/common/layouts/gnb/types';
import WAlert from '@components/common/modals/WAlert';
import WSubTitle from '@components/common/typography/WSubTitle';
import usePreparationRequest from '@hooks/apis/preparation/history/hooks/usePreparationRequest';
import { Stack, Typography } from '@mui/material';
import { mobileFormat } from '@utils/formatNumber';

interface RequesterModalType extends ModalType {
  id: string;
}

const RequesterModal = (props: RequesterModalType) => {
  const { open, handleClose, id } = props;
  const { data } = usePreparationRequest({ id });
  return (
    <WAlert
      open={open}
      handleClose={handleClose}
      title="요청자 정보"
      maxWidth="sm"
      activeOn
    >
      {data ? (
        <Stack gap="16px" paddingBottom="40px">
          <Stack>
            <WSubTitle title="이름" />
            <BoxDisabledText
              sx={{ padding: '14px 0px', backgroundColor: '#fff' }}
            >
              {data.name}
            </BoxDisabledText>
          </Stack>
          <Stack>
            <WSubTitle title="휴대폰 번호" />
            <BoxDisabledText
              sx={{ padding: '14px 0px', backgroundColor: '#fff' }}
            >
              {mobileFormat(data.mobileNumber)}
            </BoxDisabledText>
          </Stack>
          <Stack>
            <WSubTitle title="주소" />
            <BoxDisabledText
              sx={{ padding: '14px 0px', backgroundColor: '#fff' }}
            >
              {data.address}
            </BoxDisabledText>
          </Stack>
        </Stack>
      ) : (
        <Stack height="300px"></Stack>
      )}
    </WAlert>
  );
};

export default RequesterModal;
