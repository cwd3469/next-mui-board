import { UserInfoInterface } from '@components/auth/types';
import { createContext, useEffect, useState } from 'react';

const userInfoContext = createContext<UserInfoInterface | undefined>(undefined);

interface Props {
  children: JSX.Element | JSX.Element[];
}

const UserInfoProvider = ({ children }: Props): JSX.Element => {
  const [userInfo, setUserInfo] = useState<UserInfoInterface>();
  const user = {
    accountId: 'pharmcy7878',
    roles: ['PHARMACY_BASIC'],
    nameKo: '이약사',
    accountNonExpired: true,
    accountNonLocked: true,
    needResetPassword: true,
    accountType: 'PHARMACY',
    credentialsNonExpired: false,
    disabledReason: '',
    enabled: false,
    exp: 1670490927,
    iat: 1670487327,
    iss: 'WhatAilsYou Auth-Serve',
    mobileNum: '01048999939',
    service: 'PHARMACY',
    sub: '01GKGGWKCWA9QS6TBC8XBPJ1JY',
    ulid: '01GKGGWKCWA9QS6TBC8XBPJ1JY',
  };
  useEffect(() => {
    setUserInfo(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <userInfoContext.Provider value={userInfo}>
      {children}
    </userInfoContext.Provider>
  );
};

export { userInfoContext, UserInfoProvider };
