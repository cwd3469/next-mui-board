import { WBoxLayout } from '@components/common/layouts/WLayout';
import useNoticeDetail from '@hooks/apis/notion/hooks/useNoticeDetail';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { WNotionBoardBody, WNotionBoardHead } from './styled';
import { ellipsis } from '@styles/common';
import { FlexCenterC, FlexStartC, FlexStartR } from '@styles/flexGrid';
import { NoticeDetailInterface } from './type';
import WNoticeTextarea from '@components/common/inputs/Textarea/modules/WNoticeTextarea';
import { WButton } from '@components/common/button/WButton';
import { useCallback } from 'react';

const NoticeDetailPage = () => {
  const router = useRouter();
  const onClickBack = useCallback(() => {
    router.push('/notice');
  }, [router]);
  // const { noticeData } = useNoticeDetail(router.query.id);
  const noticeData: NoticeDetailInterface = {
    ulid: '1',
    title: '채널톡 알림이 안 올 경우',
    status: '공지 사항',
    createAt: '2022. 12. 10',
    contents: `데스크톱(PC)를 5분 이상 사용하지 않을 시 오프라인으로 처리되며 모바일로 알림이 갑니다\n 데스크톱 앱이 켜져 있다면, 모바일 알림은 수신되지 않습니다. PC에서 채널톡을 끄고 약 1분 후 다시 확인해 주세요.\n 하나의 계정을 여러 명이 사용하는 경우, 사용시간이 겹쳐 알림이 오지 않을 수 있습니다.상담자 별로 계정 생성, 분리하여 사용하시길 권장합니다.\n (무료 무제한 추가) 초대하실 분께 초대 링크를 전송하세요.\n 채널 톡 모바일 앱의 기기 푸시 알림을 꺼 놓은 건 아닌지 확인해 주세요.모바일 앱의 경우 밤 10시부터 아침 6시까지는 알림 '소리'가 나지 않아요.`,
    number: 1,
  };
  return (
    <FlexCenterC gap="26px">
      <WBoxLayout width="100%">
        <WNotionBoardHead>
          <FlexStartC gap="12px">
            <Typography variant="h6" className="title" sx={ellipsis}>
              {noticeData.title}
            </Typography>
            <FlexStartR gap="16px">
              <FlexStartR gap="10px">
                <Typography variant="subtitle2" className="info name">
                  구분
                </Typography>
                <Typography variant="subtitle2" className="info substance">
                  {noticeData.status}
                </Typography>
              </FlexStartR>
              <FlexStartR gap="10px">
                <Typography variant="subtitle2" className="info name">
                  작성일
                </Typography>
                <Typography variant="subtitle2" className="info substance">
                  {noticeData.createAt}
                </Typography>
              </FlexStartR>
            </FlexStartR>
          </FlexStartC>
        </WNotionBoardHead>
        <WNoticeTextarea value={noticeData.contents} />
      </WBoxLayout>
      <WButton
        onClick={onClickBack}
        variant="contained"
        sx={{
          width: '320px',
        }}
      >
        목록으로 돌아가기
      </WButton>
    </FlexCenterC>
  );
};

export default NoticeDetailPage;
