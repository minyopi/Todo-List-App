import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { postLogin, postSignUp } from '../api/auth';
import { authState } from '../store/auth';
import { authProps } from '../typings/auth';
import { isEmailValid, isPasswordValid } from '../utils/auth';

const StyledButton = styled.button<{ isValid: boolean }>`
  cursor: ${({ isValid }) => (isValid ? 'pointer' : 'not-allowed')};
`;

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useRecoilState(authState);

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

    if (authToken) {
      navigate('/');
      return;
    }

    try {
      await postLogin(loginValue).then((res) => {
        localStorage.setItem('token', res.data.token);
        setAuthToken(res.data.token);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await postSignUp(signUpValue).then((res) => {
        localStorage.setItem('token', res.data.token);
        setAuthToken(res.data.token);
      });
    } catch (error) {
      console.error(error);
    }
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
