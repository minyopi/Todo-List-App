import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { postLogin, postSignUp } from '../api/auth';
import { authState } from '../store/auth';
import { isEmailValid, isPasswordValid } from '../utils/auth';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Button, Form, Input, Tabs, Typography } from 'antd';
import { red } from '@ant-design/colors';

import type { FieldValues, SubmitHandler } from 'react-hook-form';

const { Title } = Typography;
const { TabPane } = Tabs;

const StyledFormWrapper = styled.div`
  padding: 0 20px;
`;

const StyledErrorMessage = styled.p`
  margin-top: 4px;
  color: ${red.primary};
`;

const Auth: React.FC = () => {
  const loginForm = useForm();
  const signupForm = useForm();
  const navigate = useNavigate();
  const [authInfo, setAuthInfo] = useRecoilState(authState);

  const renderLoginForm = () => {
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
          navigate('/');
        });

        navigate('/');
      } catch (error) {
        console.error(error);
        alert('로그인에 실패했습니다');
      }
    };

    return (
      <StyledFormWrapper>
        <Form name="login" autoComplete="off" onFinish={loginForm.handleSubmit(handleLogin)}>
          <Title level={4}>로그인</Title>
          <Form.Item label="Email" name="email">
            <Controller
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <Input {...field} type="text" defaultValue="" placeholder="이메일을 입력해주세요" />
              )}
              rules={{
                required: '이메일을 입력해주세요',
                validate: (value) => isEmailValid(value) || '이메일 형식에 맞게 입력해주세요',
              }}
            />
            <ErrorMessage
              name="email"
              errors={loginForm.formState.errors}
              render={({ message }) => <StyledErrorMessage>{message}</StyledErrorMessage>}
            />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Controller
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <Input.Password {...field} type="password" defaultValue="" placeholder="비밀번호를 입력해주세요" />
              )}
              rules={{ required: true, validate: (value) => isPasswordValid(value) || '8글자 이상 입력해주세요' }}
            />
            <ErrorMessage
              name="password"
              errors={loginForm.formState.errors}
              render={({ message }) => <StyledErrorMessage>{message}</StyledErrorMessage>}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              로그인
            </Button>
          </Form.Item>
        </Form>
      </StyledFormWrapper>
    );
  };

  const renderSignUpForm = () => {
    const handleSignUp: SubmitHandler<FieldValues> = async (values) => {
      const signUpValue = { email: values.email, password: values.password };

      try {
        await postSignUp(signUpValue).then((res) => {
          localStorage.setItem('token', res.data.token);
          setAuthInfo({ token: res.data.token });
          navigate('/');
        });
      } catch (error) {
        console.error(error);
        alert('회원가입에 실패했습니다');
      }
    };

    return (
      <StyledFormWrapper>
        <Form name="signUp" autoComplete="off" onFinish={signupForm.handleSubmit(handleSignUp)}>
          <Title level={4}>회원가입</Title>
          <Form.Item label="Email" name="email">
            <Controller
              control={signupForm.control}
              name="email"
              render={({ field }) => (
                <Input {...field} type="text" defaultValue="" placeholder="이메일을 입력해주세요" />
              )}
              rules={{ required: true, validate: (value) => isEmailValid(value) || '이메일 형식에 맞게 입력해주세요' }}
            />
            <ErrorMessage
              name="email"
              errors={signupForm.formState.errors}
              render={({ message }) => <StyledErrorMessage>{message}</StyledErrorMessage>}
            />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Controller
              control={signupForm.control}
              name="password"
              render={({ field }) => (
                <Input.Password {...field} type="password" defaultValue="" placeholder="비밀번호를 입력해주세요" />
              )}
              rules={{ required: true, validate: (value) => isPasswordValid(value) || '8글자 이상 입력해주세요' }}
            />
            <ErrorMessage
              name="password"
              errors={signupForm.formState.errors}
              render={({ message }) => <StyledErrorMessage>{message}</StyledErrorMessage>}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              회원 가입
            </Button>
          </Form.Item>
        </Form>
      </StyledFormWrapper>
    );
  };

  return (
    <div>
      <Tabs centered size="large" defaultActiveKey="1">
        <TabPane tab="로그인" key="1">
          {renderLoginForm()}
        </TabPane>
        <TabPane tab="회원가입" key="2">
          {renderSignUpForm()}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Auth;
