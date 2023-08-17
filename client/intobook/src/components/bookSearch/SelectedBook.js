import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookCover from './../common/bookCover';
import { addUserBook } from './../../api/userbookApi';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { ReadingBookAtom } from './../../recoil/bookmark/bookmarkAtom';
import { Box, Stack, SwipeableDrawer, Typography, Card, CardContent } from '@mui/material';
import { SearchBottomeSheetDiv } from '../../styles/bookSearch/SearchBottomSheetStyle';
import { styled } from 'styled-components';

const SelectedBook = ({ isOpen, setIsOpen, selectedInfo }) => {
  const navigate = useNavigate();
  // const setNowReadingBook = useSetRecoilState(ReadingBookAtom);
  const [nowReadingBook , setNowReadingBook] = useRecoilState(ReadingBookAtom);

  const status = selectedInfo?.status
  const bookId = selectedInfo?.bookId

  const getStatusText = () => {
    if (status === null) {
      return (
        <span>
          처음 읽는 책이네요!<br />지금 바로 등록하고 푹 빠져볼까요?
        </span>
      );
    } else if (status === 'COMPLETE') {
      return (
        <span>
          이미 다 읽어본 책이네요!<br />다른 책을 한번 찾아볼까요?
        </span>
      );
    } else {
      return (
        <span>
          읽고 있던 책이네요!<br />다시 한번 푹 빠져볼까요?
        </span>
      );
    }
  };

  const registerBookHandler = async () => {
    try {
      await addUserBook(bookId);
      console.log('selectdBook1', selectedInfo);
      setNowReadingBook(selectedInfo);
      const modalVal = localStorage.getItem('hasCloseCompleteBookModal');
      if (modalVal === 'true') {
        localStorage.setItem('hasCloseCompleteBookModal', 'false');
      }
      console.log('selectdBook2', nowReadingBook);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <SwipeableDrawer anchor='bottom' open={isOpen} onClose={() => setIsOpen(false)} onOpen={() => setIsOpen(true)}
        BackdropProps={{
          style:
          {
            width: '100%', margin: 'auto'
          }
        }}
        PaperProps={{
          sx: {
            width: '100%', margin: 'auto', borderTopRightRadius: '20px', borderTopLeftRadius: '20px'
          }
        }}>
        <Stack width={400} height={295} margin={'0 auto'}>
          <SearchBottomeSheetDiv>
            <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none', margin: '0 auto', width: { xs: '90%' }, textAlign: 'center' }} >
              <BookCover image={selectedInfo?.cover} alt={selectedInfo?.title + 'image'}
                customStyle={{ width: '88px', height: '120px', borderRadius: '10px' }}
              />
              <CardContent sx={{ width: '200px', height: '42px', padding: '2px', margin: '0 auto' }} >
                <TitleTypography
                  fontWeight={'bold'}
                  fontSize={'12px'}
                  align='center'
                  letterSpacing={'-0.5px'}
                >
                  {selectedInfo?.title}
                </TitleTypography>
                <TitleTypography fontSize={'10px'} align='center' color={'black'} letterSpacing={'-1px'}>
                  {selectedInfo?.author}
                </TitleTypography>
              </CardContent>
              <Typography fontSize={'15px'} align='center' color={'black'} fontWeight={700} marginY={'12px'} lineHeight={'normal'} >
                {getStatusText()}
              </Typography>
              <StatusButton onClick={() => setIsOpen(false)} style={{ border: '1px solid var(--main-color)', color: 'var(--main-color)' }}>다른 책 선택하기</StatusButton>
              {status !== 'COMPLETE' && <StatusButton onClick={registerBookHandler} style={{ background: 'var(--main-color)' }}>지금 읽을래요</StatusButton>}
            </Card>
          </SearchBottomeSheetDiv>
        </Stack>
      </SwipeableDrawer>
    </Box>
  );
};

const TitleTypography = styled(Typography)`
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: 36px;
`;

const StatusButton = styled.button`
  width: 120px;
  height: 30px;
  margin: 0 6px;
  flex-shrink: 0;
  border-radius: 100px;
  border: none;
  background: var(--white);
  color: var(--white);
  text-align: center;
  font-family: var(--main-font);
  font-size: var(--font-h6);
  letter-spacing: 0.4px;
  cursor: pointer;
`;

export default SelectedBook;