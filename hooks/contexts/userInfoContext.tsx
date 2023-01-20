import { UserInfoInterface } from '@components/auth/types';
import { getCookie } from 'cookies-next';
import jwtDecode from 'jwt-decode';
import { createContext, useCallback, useEffect, useState } from 'react';

interface UserInfoContext {
  userInfo?: UserInfoInterface;
  setInUserInfo: (info: UserInfoInterface) => void;
}

const userInfoContext = createContext<UserInfoContext>({
  userInfo: undefined,
  setInUserInfo: (info: UserInfoInterface) => {
    return;
  },
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const UserInfoProvider = ({ children }: Props): JSX.Element => {
  const [userInfo, setUserInfo] = useState<UserInfoInterface>();
  const setInUserInfo = useCallback((info: UserInfoInterface) => {
    setUserInfo(info);
  }, []);

  useEffect(() => {
    const cookie = getCookie('accessToken');
    if (cookie) {
      const userinfo: UserInfoInterface = jwtDecode(cookie as string);
      setUserInfo(userinfo);
    }
  }, []);

  const value = {
    userInfo: userInfo,
    setInUserInfo: setInUserInfo,
  };

  return (
    <userInfoContext.Provider value={value}>
      {children}
    </userInfoContext.Provider>
  );
};

export { userInfoContext, UserInfoProvider };
