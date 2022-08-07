import styled from 'styled-components';
import StyledLink from '../../styles/common/StyledLink';

const StyledHeader = styled.header`
  height: 60px;
  border: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
`;

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <StyledLink to="/">Todo List</StyledLink>
      <nav>
        <ul>
          <li>
            <StyledLink to="/auth">Login</StyledLink>
          </li>
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default Header;
