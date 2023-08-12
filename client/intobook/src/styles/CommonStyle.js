import { styled } from 'styled-components';

//기본 배경(기본 모든 페이지에서 공유하는 배경)
export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  gap: 1rem;
  background-image: url(/backgroundImg.png);
  background-size: cover;
  background-position: center center;
  /*border: 1px solid lightgray;*/
`;

//full 배경(로그인,책검색 시 사용)
export const LayoutSecond = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  gap: 1rem;
  border: 1px solid lightgray;
  background-color: var(--main-color);
  /*border: 1px solid lightgray;*/
`;