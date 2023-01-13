import { WNotionBoardBody } from '@components/notice/styled';
import { Box } from '@mui/material';
import { WTaxtarea } from '..';

interface WNoticeTextareaType {
  value: string;
}

const WNoticeTextarea = (props: WNoticeTextareaType) => {
  const { value } = props;

  return (
    <WNotionBoardBody>
      <WTaxtarea value={value} sx={{ color: '#555', lineHeight: '20px' }} />
    </WNotionBoardBody>
  );
};

export default WNoticeTextarea;
