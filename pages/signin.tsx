import AuthPage from '@components/auth/AuthPage';
import { SigninInfoProvider } from '@hooks/contexts/info/SigninInfoContext';
import { UserInfoContext } from '@hooks/contexts/user/UserInfoContext';
import { useContext, useEffect } from 'react';

const Signin = () => {
  const { deleteToken } = useContext(UserInfoContext);

  useEffect(() => {
    if (deleteToken) {
      deleteToken();
    }
  }, [deleteToken]);
  return (
    <SigninInfoProvider>
      <main>
        <AuthPage />
      </main>
    </SigninInfoProvider>
  );
};

export default Signin;
