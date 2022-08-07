import { useEffect, useState } from 'react';
import { isEmailValid } from '../utils/isEmailValid';
import { isPasswordValid } from '../utils/isPasswordValid';

interface authProps {
  email: string;
  password: string;
}

const Auth: React.FC = () => {
  const [loginValue, setLoginValue] = useState<authProps>({ email: '', password: '' });
  const [signUpValue, setSignUpValue] = useState<authProps>({ email: '', password: '' });
  const [isLoginValid, setIsLoginValid] = useState(false);
  const [isSignUpValid, setIsSignUpValid] = useState(false);

  console.log(isLoginValid, isSignUpValid);

  useEffect(() => {
    isEmailValid(loginValue.email) && isPasswordValid(loginValue.password)
      ? setIsLoginValid(true)
      : setIsLoginValid(false);

    isEmailValid(signUpValue.email) && isPasswordValid(signUpValue.password)
      ? setIsSignUpValid(true)
      : setIsSignUpValid(false);
  }, [loginValue, signUpValue]);

  const renderLogin = () => {
    return (
      <form>
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
        {isLoginValid ? <button>로그인</button> : null}
      </form>
    );
  };

  const renderSignUp = () => {
    return (
      <form>
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
        {isSignUpValid ? <button>회원 가입</button> : null}
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
