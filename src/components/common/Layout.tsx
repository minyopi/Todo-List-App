import styled from 'styled-components';

type LayoutType = 'center' | 'full';

interface LayoutProps {
  children: React.ReactNode;
  type: LayoutType;
}

const StyledWrapper = styled.div<{ type: LayoutType }>`
  padding: ${({ type }) => (type === 'center' ? '40px' : undefined)};
`;

const Layout: React.FC<LayoutProps> = ({ children, type }) => {
  return <StyledWrapper type={type}>{children}</StyledWrapper>;
};

export default Layout;
