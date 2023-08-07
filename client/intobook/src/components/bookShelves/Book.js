import React, { useState } from 'react';
import BookCover from './../common/bookCover';
import { Typography, Card, CardContent } from '@mui/material';
import { styled } from 'styled-components';

const ResultBook = ({ bookInfo }) => {
  const tempTitle = bookInfo?.title;
  const tempAauthor = bookInfo?.author;
  
  const title = tempTitle && tempTitle.includes('-') ? tempTitle.split('-')[0].trim() : tempTitle;
  const author = tempAauthor && tempAauthor.includes('(') ? tempAauthor.split('(')[0].trim() : tempAauthor;
  const publisher = bookInfo?.publisher ? bookInfo?.publisher : '출판사'; 
  const bookId = bookInfo?.isbn13 || bookInfo?.isbn;
  const status = bookInfo?.status;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none', width: {xs: '88px'}}}  >
      <BookCover image={bookInfo?.coverImage} alt={title + 'image'}
        customStyle={{ width: '88px', height: '120px', borderRadius: '10px' }}
      />
        <CardContent sx={{ height: '42px', padding: '2px'}} >
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
          <Typography fontSize={'10px'} align='center' color={'black'} letterSpacing={'-1px'}>
            ({publisher})
          </Typography>
        </CardContent>
    </Card>
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