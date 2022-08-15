import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { postSignUp } from '../api/auth';
import { authState } from '../store/auth';
import { isEmailValid, isPasswordValid } from '../utils/auth';
import { Controller, useForm } from 'react-hook-form';
import { Button, Form, Input } from 'antd';

import type { FieldValues, SubmitHandler } from 'react-hook-form';

const SignUp: React.FC = () => {
  const signupForm = useForm();
  const navigate = useNavigate();
  const setAuthInfo = useSetRecoilState(authState);

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

export default SignUp;
