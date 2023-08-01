import React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import {userbooks} from './../../api/userbookApi';

const StyledBookshelvesContentPage = styled.div`
  border: 1px solid black;
  margin: 10px 10px 10px 10px;
`;

const StyledBookshelvesTab = styled.div`
  border: 1px solid black;
  margin: 10px 10px 10px 10px;
`;

const StyledContentsSpace = styled.div`
  border: 1px solid black;
  margin: 10px 10px 10px 10px;
`;

const BookshelvesContent = () => {
    
    useEffect(() => {
        const fetchUserBooks = async () => {
            try {
                const res = userbooks('createdAt',0,'INTEREST')
                console.log("객체 받아오기",res)
            } catch (error) {
                console.error("에러발생:",error)
            }
        };

        fetchUserBooks();
    },[]);

    return ( 
        <StyledBookshelvesContentPage>
            <StyledBookshelvesTab>탭이 들어갈 공간</StyledBookshelvesTab>
            <hr/>
            <StyledContentsSpace>내용이 들어갈 공간</StyledContentsSpace>
        </StyledBookshelvesContentPage>
     );
}
 
export default BookshelvesContent;