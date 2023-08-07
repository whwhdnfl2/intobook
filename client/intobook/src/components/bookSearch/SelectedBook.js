import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, SwipeableDrawer, Typography, Card, CardContent } from '@mui/material';
import BookCover from './../common/bookCover';
import { SearchBottomeSheetDiv } from '../../styles/bookSearch/SearchBottomSheetStyle';
import { styled } from 'styled-components';
import { addUserBook } from '../../api/userbookApi';

const SelectedBook = ({ isOpen, setIsOpen, selectedInfo }) => {
  const navigate = useNavigate();
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
    if (!status) { // 책장에 없는 책일 경우
      const res = await addUserBook(bookId);

      if (res === 'success') {
        navigate('/')
      }
    };
  };

  return (
    <Box>
      <SwipeableDrawer anchor='bottom' open={isOpen} onClose={() => setIsOpen(false)} onOpen={() => setIsOpen(true)}
        BackdropProps={{
          style:
          {
            width: '360px', margin: 'auto'
          }
        }}
        PaperProps={{
          sx: {
            width: '360px', margin: 'auto', borderTopRightRadius: '20px', borderTopLeftRadius: '20px'
          }
        }}>
        <Stack width={360} height={295} >
          <SearchBottomeSheetDiv>
            <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none', width: { xs: '360px' }, textAlign: 'center' }} >
              <BookCover image={selectedInfo?.cover} alt={selectedInfo?.title + 'image'}
                customStyle={{ width: '88px', height: '120px', borderRadius: '10px' }}
              />
              <CardContent sx={{ width: '180px', height: '42px', padding: '2px', margin: '0 auto' }} >
                <TitleTypography
                  fontWeight={'bold'}
                  fontSize={'12px'}
                  align='center'
                  letterSpacing={'-0.5px'}
                >
                  {selectedInfo?.title}
                </TitleTypography>
                <Typography fontSize={'10px'} align='center' color={'black'} letterSpacing={'-1px'}>
                  {selectedInfo?.author}
                </Typography>
                <Typography fontSize={'10px'} align='center' color={'black'} letterSpacing={'-1px'}>
                  ({selectedInfo?.publisher})
                </Typography>
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
`;

export default SelectedBook;