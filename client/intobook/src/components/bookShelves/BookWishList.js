import React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import {userbooks} from './../../api/userbookApi';

const StyledBookWishListPage = styled.div`
  border: 1px solid black;
  margin: 10px 10px 10px 10px;
`;

const BookWishList = () => {
    return ( 
        <StyledBookWishListPage>
           여기는 위시리스트
        </StyledBookWishListPage>
     );
}
 
export default BookWishList;