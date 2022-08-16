import { Spin, Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

const StyledLoadingWrapper = styled.div`
  text-align: center;
  margin-top: 40px;
`;

const Loading: React.FC = () => {
  return (
    <StyledLoadingWrapper>
      <Spin size="large" />
      <Title level={2}>Loading...</Title>
    </StyledLoadingWrapper>
  );
};

export default Loading;
