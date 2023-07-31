import { styled } from 'styled-components';

export const Booksearch = styled.div`
  height: 100vh;
  display: flex;
  align-items: flex-end;
  min-width: 360px;
`;

export const SearchBottomeSheetDiv = styled.div`
  width: 360px;
  min-height: 254px;
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
  font-size: var(--font-size-m);
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