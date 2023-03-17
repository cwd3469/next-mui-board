import { useQuery } from 'react-query';
import { apiNoticeDetail } from '..';
import { NOTICEDETAIL } from '../queryKey';

const useNoticeDetail = (parms: string) => {
  const info = useQuery(NOTICEDETAIL(parms), async () => {
    return await apiNoticeDetail(parms);
  });

  return info;
};

export default useNoticeDetail;
