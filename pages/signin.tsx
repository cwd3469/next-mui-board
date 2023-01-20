import AuthPage from '@components/auth/AuthPage';
import { SigninInfoProvider } from '@hooks/contexts/info/SigninInfoContext';

const Signin = () => {
  return (
    <SigninInfoProvider>
      <main>
        <AuthPage />
      </main>
    </SigninInfoProvider>
  );
};

export default Signin;
