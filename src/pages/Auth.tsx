import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { postLogin, postSignUp } from '../api/auth';
import { authState } from '../store/auth';
import { isEmailValid, isPasswordValid } from '../utils/auth';
import { Controller, useForm } from 'react-hook-form';
import { Button, Form, Input } from 'antd';

import type { FieldValues, SubmitHandler } from 'react-hook-form';

const Auth: React.FC = () => {
  const loginForm = useForm();
  const signupForm = useForm();
  const navigate = useNavigate();

  const [authInfo, setAuthInfo] = useRecoilState(authState);

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
      <Form
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
        onFinish={loginForm.handleSubmit(handleLogin)}
      >
        <h2>로그인</h2>
        <Form.Item label="Email" name="email">
          <Controller
            control={loginForm.control}
            name="email"
            render={({ field }) => <Input {...field} type="text" defaultValue="" placeholder="이메일을 입력해주세요" />}
            rules={{ required: true, validate: (value) => isEmailValid(value) }}
          />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Controller
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <Input.Password {...field} type="password" defaultValue="" placeholder="비밀번호를 입력해주세요" />
            )}
            rules={{ required: true, validate: (value) => isPasswordValid(value) }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            로그인
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const renderSignUp = () => {
    return (
      <Form
        name="signUp"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
        onFinish={signupForm.handleSubmit(handleSignUp)}
      >
        <h2>회원가입</h2>
        <Form.Item label="Email" name="email">
          <Controller
            control={signupForm.control}
            name="email"
            render={({ field }) => <Input {...field} type="text" defaultValue="" placeholder="이메일을 입력해주세요" />}
            rules={{ required: true, validate: (value) => isEmailValid(value) }}
          />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Controller
            control={signupForm.control}
            name="password"
            render={({ field }) => (
              <Input.Password {...field} type="password" defaultValue="" placeholder="비밀번호를 입력해주세요" />
            )}
            rules={{ required: true, validate: (value) => isPasswordValid(value) }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            회원 가입
          </Button>
        </Form.Item>
      </Form>
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
