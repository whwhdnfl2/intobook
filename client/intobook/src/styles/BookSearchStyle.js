import { styled } from 'styled-components';

// BookSearchToggle.js
export const Booksearch = styled.div`
  height: 100vh;
  display: flex;
  align-items: flex-end;
  min-width: 360px;
`;

export const BookSearchToggleDiv = styled.div`
width: 360px;
min-height: 210px;
border-radius: 20px;
padding: 13px 0;
position: relative;
display: flex;
flex-direction: column;
align-items: center;
background-color: var(--white);
`;

export const Title = styled.div`
  font-family: var(--content-font);
  font-weight: 400;
  font-size: 20px;
  color: #00000066;
  width: 360px;
  min-height: 24px;
  text-align: center;
`;

export const TopLine = styled.div`
  width: 360px;
  border-top: 0.5px solid rgba(0, 0, 0, 0.2);
  margin-top: 20px;
  `;
  
export const Line = styled.div`
  width: 340px;
  border-top: 0.5px solid rgba(0, 0, 0, 0.2);
  margin-top: 14px;
`;

// SearchGroups.js
export const SearchGroup = styled.div`
  margin-top: 13px;
  margin-left: 8.19px;
  display: flex;
  align-items: flex-start;
  min-width: 338px;
  gap: 14px;
  backgroun-color: pink;
`;

export const SearchIcon = styled.img`
  width: 24px;
  height: 26px;
`;
export const SearchMethod = styled.div`
  font-family: var(--content-font);
  font-weight: 400;
  font-size: 18px;
  color: #00000066;
  width: 298px;
  min-height: 24px;
  letter-spacing: 0;
  line-height: normal;
`;