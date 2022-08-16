import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface StyledLinkProps {
  children: React.ReactNode;
  to: string;
}

const StyledCommonLink = styled(Link)`
  text-decoration: none;
  color: #3a3a3a;
`;

const StyledLink: React.FC<StyledLinkProps> = ({ children, to }) => {
  return <StyledCommonLink to={to}>{children}</StyledCommonLink>;
};

export default StyledLink;
