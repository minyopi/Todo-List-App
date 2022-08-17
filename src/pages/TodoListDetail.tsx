import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { getTodoById } from '../apis/todoList';
import { authState } from '../store/auth';
import { Layout, Loading } from '../components/common';
import { StyledLink } from '../styles/common';
import { Breadcrumb } from 'antd';

import type { TodoData } from '../typings/todoList';
import { useQuery } from 'react-query';

const StyledTodoDetailWrapper = styled.div`
  padding: 40px 0;
`;

const StyledH1 = styled.h1`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
`;

const TodoListDetail: React.FC = () => {
  const { id } = useParams();
  const { token } = useRecoilValue(authState);

  const { refetch, isFetching } = useQuery('getTodoById', () => getTodoById(id ?? ''), {
    enabled: false,
  });

  const [todoDetail, setTodoDetail] = useState<TodoData>();

  useEffect(() => {
    if (!token || !id) {
      return;
    }

    refetch().then((res) => {
      setTodoDetail(res.data?.data.data);
    });
  }, [token]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <Layout type="center">
      <Breadcrumb>
        <Breadcrumb.Item>
          <StyledLink to="/">Todo List</StyledLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <StyledLink to={`/detail/${id}`}>{todoDetail?.title}</StyledLink>
        </Breadcrumb.Item>
      </Breadcrumb>

      {todoDetail ? (
        <StyledTodoDetailWrapper>
          <StyledH1>Detail Page</StyledH1>
          <div>title: {todoDetail.title}</div>
          <div>content: {todoDetail.content}</div>
          <div>createdAt: {todoDetail.createdAt}</div>
          <div>updateAt: {todoDetail.updatedAt}</div>
        </StyledTodoDetailWrapper>
      ) : (
        <div>정보를 불러올 수 없습니다.</div>
      )}
    </Layout>
  );
};

export default TodoListDetail;
