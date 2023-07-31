import React from 'react';
import styled from 'styled-components';
import BookshelvesContent from '../components/bookShelves/BookshelvesContent';

const StyledBookshelvesPage = styled.div`
  font-size: 18px;
`;

const BookshelvesPage = () => {
    return ( 
    <StyledBookshelvesPage>
       <BookshelvesContent/>
    </StyledBookshelvesPage>
    );
}
 
export default BookshelvesPage;