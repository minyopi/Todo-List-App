import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { signUp } from '../api/auth';
import { isEmailValid } from '../utils/isEmailValid';
import { isPasswordValid } from '../utils/isPasswordValid';

const StyledButton = styled.button<{ isValid: boolean }>`
  cursor: ${({ isValid }) => (isValid ? 'pointer' : 'not-allowed')};
`;

interface authProps {
  email: string;
  password: string;
}

const Auth: React.FC = () => {
  const [loginValue, setLoginValue] = useState<authProps>({ email: '', password: '' });
  const [signUpValue, setSignUpValue] = useState<authProps>({ email: '', password: '' });
  const [isLoginValid, setIsLoginValid] = useState(false);
  const [isSignUpValid, setIsSignUpValid] = useState(false);

  const isLoginInfoValid = isEmailValid(loginValue.email) && isPasswordValid(loginValue.password);
  const isSignUpInfoValid = isEmailValid(signUpValue.email) && isPasswordValid(signUpValue.password);

  useEffect(() => {
    isLoginInfoValid ? setIsLoginValid(true) : setIsLoginValid(false);
    isSignUpInfoValid ? setIsSignUpValid(true) : setIsSignUpValid(false);
  }, [loginValue, signUpValue]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const responseMessage = await signUp(signUpValue);
    alert(responseMessage);
  };

  const renderLogin = () => {
    return (
      <form onSubmit={handleLogin}>
        <h2>로그인</h2>
        <input
          type="text"
          value={loginValue.email}
          placeholder="email"
          onChange={(e) => {
            setLoginValue((prev) => {
              return { ...prev, email: e.target.value };
            });
          }}
        />
        <input
          type="password"
          value={loginValue.password}
          placeholder="password"
          onChange={(e) => {
            setLoginValue((prev) => {
              return { ...prev, password: e.target.value };
            });
          }}
        />
        <StyledButton type="submit" disabled={!isLoginValid} isValid={isLoginValid}>
          로그인
        </StyledButton>
      </form>
    );
  };

  const renderSignUp = () => {
    return (
      <form
        onSubmit={(e) => {
          handleSignUp(e);
        }}
      >
        <h2>회원가입</h2>
        <input
          type="text"
          value={signUpValue.email}
          placeholder="email"
          onChange={(e) => {
            setSignUpValue((prev) => {
              return { ...prev, email: e.target.value };
            });
          }}
        />
        <input
          type="password"
          value={signUpValue.password}
          placeholder="password"
          onChange={(e) => {
            setSignUpValue((prev) => {
              return { ...prev, password: e.target.value };
            });
          }}
        />
        <StyledButton type="submit" disabled={!isSignUpValid} isValid={isSignUpValid}>
          회원 가입
        </StyledButton>
      </form>
    );
  };

  return (
    <div>
      {renderLogin()}
      {renderSignUp()}
    </div>
  );
};

export default Auth;
