import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMount } from 'react-use';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { getTodoById } from '../api/todoList';
import { authState } from '../store/auth';
import { todoData } from '../typings/todoList';

const StyledTodoDetailWrapper = styled.div`
  padding: 40px;
`;

const StyledH1 = styled.h1`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
`;

const TodoListDetail: React.FC = () => {
  const { id } = useParams();
  const { token } = useRecoilValue(authState);

  const [todoDetail, setTodoDetail] = useState<todoData>();

  useMount(async () => {
    if (!id) {
      return;
    }

    const response = await getTodoById(id, token);
    setTodoDetail(response?.data.data);
  });

  return (
    <>
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
    </>
  );
};

export default TodoListDetail;
