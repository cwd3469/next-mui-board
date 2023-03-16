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
import { dateFormat } from '@utils/date';

const NoticeDetailPage = () => {
  const router = useRouter();
  const onClickBack = useCallback(() => {
    router.push('/notice');
  }, [router]);
  const { data, isError, isLoading } = useNoticeDetail(
    router.query.id ? (router.query.id as string) : '0',
  );

  return (
    <FlexCenterC gap="26px">
      <WBoxLayout width="100%">
        {isLoading ? (
          <>isLoading...</>
        ) : isError ? (
          <>isError...</>
        ) : data ? (
          data.data.code === '0000' ? (
            <>
              <WNotionBoardHead>
                <FlexStartC gap="12px">
                  <Typography variant="h6" className="title" sx={ellipsis}>
                    {data.data.data.title}
                  </Typography>
                  <FlexStartR gap="16px">
                    <FlexStartR gap="10px">
                      <Typography variant="subtitle2" className="info name">
                        구분
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        className="info substance"
                      >
                        {data.data.data.type}
                      </Typography>
                    </FlexStartR>
                    <FlexStartR gap="10px">
                      <Typography variant="subtitle2" className="info name">
                        작성일
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        className="info substance"
                      >
                        {dateFormat(data.data.data.createdAt).day}
                      </Typography>
                    </FlexStartR>
                  </FlexStartR>
                </FlexStartC>
              </WNotionBoardHead>
              <WNoticeTextarea value={data.data.data.content} />
            </>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
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
