import { Stack } from '@mui/material';
import SignupButton from './signup/Signup';
import { SigninLayout } from './styled';

const AuthPage = () => {
  return (
    <SigninLayout>
      <Stack>
        <SignupButton />
      </Stack>
    </SigninLayout>
  );
};

export default AuthPage;
