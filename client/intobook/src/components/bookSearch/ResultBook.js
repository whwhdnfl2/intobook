import React, { useState } from 'react';
import BookCover from './../common/bookCover';
import { Typography, Card, CardContent } from '@mui/material';
import { styled } from 'styled-components';
import SelectedBook from './SelectedBook';

const ResultBook = ({ bookCover }) => {
  const tempTitle = bookCover?.title;
  const tempAauthor = bookCover?.author;

  const title = tempTitle && tempTitle.includes('-') ? tempTitle.split('-')[0].trim() : tempTitle;
  const author = tempAauthor && tempAauthor.includes('(') ? tempAauthor.split('(')[0].trim() : tempAauthor;
  console.log(bookCover)
  const bookId = bookCover?.isbn13 || bookCover?.isbn;
  const status = bookCover?.status;
  const coverImage = bookCover?.cover ? bookCover?.cover : bookCover?.coverImage

  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => {
    setIsOpen(true);
  };

  const selectedInfo = {
    cover: bookCover?.cover,
    title,
    author,
    bookId,
    status
  }

  return (
    <>
      <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none', width: { xs: '88px' }, cursor: 'pointer' }} onClick={clickHandler}>
        <BookCover image={coverImage} alt={title + 'image'}
          customStyle={{ width: '88px', height: '120px', borderRadius: '10px' }}
        />
        <CardContent sx={{ height: '42px', padding: '2px' }} >
          <TitleTypography
            fontWeight={'bold'}
            fontSize={'12px'}
            align='center'
            letterSpacing={'-0.5px'}
          >
            {title}
          </TitleTypography>
          <Typography fontSize={'10px'} align='center' color={'black'} letterSpacing={'-1px'}>
            {author}
          </Typography>
        </CardContent>
      </Card>
      <SelectedBook isOpen={isOpen} setIsOpen={setIsOpen} clickHandler={clickHandler} selectedInfo={selectedInfo} />
    </>
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

export default ResultBook;