import { styled } from 'styled-components';

// BookSearchPage.js
export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  height: 77vh;
  gap: 30px;
`;

// SearchResults.js
export const ResultsContainer = styled.div`
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0;
  }
`;