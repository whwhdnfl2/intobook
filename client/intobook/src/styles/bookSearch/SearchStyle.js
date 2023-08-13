import { styled } from 'styled-components';

// SearchResults.js
export const ResultsContainer = styled.div`
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0;
  }
`;