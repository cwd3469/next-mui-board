export interface NoticeInterface {
  ulid: string;
  title: string;
  status: string;
  createAt: string;
  number: number;
}
export interface NoticeDetailInterface extends NoticeInterface {
  contents: string;
}
