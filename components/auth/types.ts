export interface UserInfoInterface {
  accountId: string;
  roles: string[];
  nameKo: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  needResetPassword: boolean;
  accountType: string;
  credentialsNonExpired: boolean;
  disabledReason: string;
  enabled: boolean;
  exp: number;
  iat: number;
  iss: string;
  mobileNum: string;
  service: string;
  sub: string;
  ulid: string;
}
