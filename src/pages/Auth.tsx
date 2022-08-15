import { Link } from 'react-router-dom';

const Auth: React.FC = () => {
  return (
    <div>
      <Link to="/auth/login">로그인</Link>
      <Link to="/auth/signUp">회원가입</Link>
    </div>
  );
};

export default Auth;
