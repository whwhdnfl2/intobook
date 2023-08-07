import React, {useEffect} from 'react';
import { userbooks } from '../../api/userbookApi';
import { useRecoilState } from 'recoil';
import { UserBooksAtom } from '../../recoil/user/UserAtom';
import { styled } from 'styled-components';
import { Typography } from '@mui/material';
import BookCover from './../common/bookCover';

const BookList = ({bookStatus, orderBy}) => {
    const [userBooks, setUserBooks] = useRecoilState(UserBooksAtom)

    const fetchBooks = async () => {
        // api 호출
        try {
          const response = await userbooks(orderBy,0,bookStatus);
          setUserBooks((prev) => response);
        } catch (err) {
          console.log(err);
        }
      };

    useEffect(() => {
        fetchBooks();
      }, [orderBy, bookStatus]);

    //나중에 style 폴더로 빼야함
    const StyledBookCompo = styled.div`
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin : 10px 10px 10px 10px;
      font-size: var(--font-h6);
    `;

    const StyledBookList = styled.div`
      display: flex;
      flex-wrap: wrap;
    `

    return ( 
    <div>
        <StyledBookList>
            {userBooks.length > 0 ? (
            userBooks.map((book) => (
                <StyledBookCompo>
                    <BookCover key={book.userBookPk} image={book.coverImage} alt={"책이미지"}/>
                    {/* <span>{book.title}</span> */}
                </StyledBookCompo>
            ))
        ) : (
            <p>책이 없습니다.</p>
        )}
      </StyledBookList>
    </div> );
}
 
export default BookList;