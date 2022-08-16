import styled from 'styled-components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMount } from 'react-use';
import { useRecoilValue } from 'recoil';
import { getTodoById } from '../apis/todoList';
import Layout from '../components/common/Layout';
import StyledLink from '../components/common/StyledLink';
import { authState } from '../store/auth';
import { Breadcrumb } from 'antd';

import type { TodoData } from '../typings/todoList';

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

  const [todoDetail, setTodoDetail] = useState<TodoData>();

  useMount(async () => {
    if (!id) {
      return;
    }

    const response = await getTodoById(id);
    setTodoDetail(response?.data.data);
  });

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
