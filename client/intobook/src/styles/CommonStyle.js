import { styled } from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  gap: 1rem;
  border: 1px solid lightgray;
  background-color: var(--main-color); /* 원하는 배경색 */
`;

export const Layout_2 = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  gap: 1rem;
  border: 1px solid lightgray;
  background-color: pink; /* 원하는 배경색 */
`;