import React, { useEffect } from 'react';
import { userbooks } from './../../api/userbookApi';
import { useRecoilValue } from 'recoil'; 
import { UsernameSelector, UserBooksSelector } from './../../recoil/user/UserSelector';
import styled from 'styled-components';

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
        const getUserBooks = async () => {
            try {
                const res = userbooks('startedAt', 0, 'READING')
                console.log("객체 받아오기",res.array)
            } catch (error) {
                console.error("에러발생:",error)
            }
        };
        // const getUserBooks = async () => {
        //   const userBooks = userbooks('startedAt', 0, 'READING')
        //   console.log(userbooks)
        // };

        getUserBooks();
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