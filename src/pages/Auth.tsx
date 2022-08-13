import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { postLogin, postSignUp } from '../api/auth';
import { authState } from '../store/auth';
import { isEmailValid, isPasswordValid } from '../utils/auth';
import { Controller, useForm } from 'react-hook-form';

import type { FieldValues, SubmitHandler } from 'react-hook-form';

const StyledButton = styled.button<{ isValid: boolean }>`
  cursor: ${({ isValid }) => (isValid ? 'pointer' : 'not-allowed')};
`;

const Auth: React.FC = () => {
  const loginForm = useForm();
  const signupForm = useForm();
  const navigate = useNavigate();

  const [authInfo, setAuthInfo] = useRecoilState(authState);
  const [isLoginValid, setIsLoginValid] = useState(false);
  const [isSignUpValid, setIsSignUpValid] = useState(false);

  const isLoginInfoValid = isEmailValid(loginForm.getValues().email) && isPasswordValid(loginForm.getValues().password);
  const isSignUpInfoValid =
    isEmailValid(signupForm.getValues().email) && isPasswordValid(signupForm.getValues().password);

  useEffect(() => {
    isLoginInfoValid ? setIsLoginValid(true) : setIsLoginValid(false);
    isSignUpInfoValid ? setIsSignUpValid(true) : setIsSignUpValid(false);
  }, [loginForm, signupForm]);

  const handleLogin: SubmitHandler<FieldValues> = async (values) => {
    const loginValue = { email: values.email, password: values.password };

    if (authInfo.token) {
      navigate('/');
      return;
    }

    try {
      await postLogin(loginValue).then((res) => {
        localStorage.setItem('token', res.data.token);
        setAuthInfo({ token: res.data.token });
      });

      navigate('/');
    } catch (error) {
      console.error(error);
      alert('로그인에 실패했습니다');
    }
  };

  const handleSignUp: SubmitHandler<FieldValues> = async (values) => {
    const signUpValue = { email: values.email, password: values.password };

    try {
      await postSignUp(signUpValue).then((res) => {
        localStorage.setItem('token', res.data.token);
        setAuthInfo({ token: res.data.token });
      });
    } catch (error) {
      console.error(error);
      alert('회원가입에 실패했습니다');
    }
  };

  const renderLogin = () => {
    return (
      <form onSubmit={loginForm.handleSubmit(handleLogin)}>
        <h2>로그인</h2>
        <Controller
          control={loginForm.control}
          name="email"
          render={({ field }) => <input {...field} type="text" defaultValue="" placeholder="이메일을 입력해주세요" />}
          rules={{ required: true }}
        />
        <Controller
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <input {...field} type="password" defaultValue="" placeholder="이메일을 입력해주세요" />
          )}
          rules={{ required: true }}
        />
        <StyledButton type="submit" disabled={!isLoginValid} isValid={isLoginValid}>
          로그인
        </StyledButton>
      </form>
    );
  };

  const renderSignUp = () => {
    return (
      <form onSubmit={signupForm.handleSubmit(handleSignUp)}>
        <h2>회원가입</h2>
        <Controller
          control={signupForm.control}
          name="email"
          render={({ field }) => <input {...field} type="text" defaultValue="" placeholder="이메일을 입력해주세요" />}
          rules={{ required: true }}
        />
        <Controller
          control={signupForm.control}
          name="password"
          render={({ field }) => (
            <input {...field} type="password" defaultValue="" placeholder="이메일을 입력해주세요" />
          )}
          rules={{ required: true }}
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
