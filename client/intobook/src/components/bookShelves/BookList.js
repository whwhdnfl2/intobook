import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { userbooks } from '../../api/userbookApi';
import { useRecoilState } from 'recoil';
import { UserBooksAtom } from '../../recoil/user/UserAtom';
import { styled } from 'styled-components';
import { Stack, Box } from '@mui/material';
import { ResultsContainer } from '../../styles/bookSearch/SearchStyle';
import  Book from './Book'

const BookList = ({bookStatus, orderBy, pageKind}) => {
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
      font-size: var(--font-h5);
    `;

    return ( 
    <div>
        <ResultsContainer>
          <Stack direction='row' flexWrap='wrap' justifyContent='start' columnGap={3.5} rowGap={1.5}>
            { userBooks.length >0? (
              userBooks.map((book) => (
                <Box key={book.userBookPk}>
                  <Link to={`/userbook/${book.userBookPk}`} style={{ textDecoration: 'none' }}>
                   <Book bookInfo={book}/>
                  </Link>
                </Box>
              ))
            ) : (<p>책이 없습니다.</p>)}
          </Stack>
    </ResultsContainer> 
    </div> );
}
 
export default BookList;