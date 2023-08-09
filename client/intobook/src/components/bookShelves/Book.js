import React from 'react';
import BookCover from './../common/bookCover';
import { Typography, Card } from '@mui/material';
import { styled } from 'styled-components';
import { ProgressBar } from '../common';

const ResultBook = ({ bookInfo, customStyle, width }) => {
  const tempTitle = bookInfo?.title;
  const tempAauthor = bookInfo?.author;
  
  const title = tempTitle && tempTitle.includes('-') ? tempTitle.split('-')[0].trim() : tempTitle;
  const author = tempAauthor && tempAauthor.includes('(') ? tempAauthor.split('(')[0].trim() : tempAauthor;
  // const publisher = bookInfo?.publisher ? bookInfo?.publisher : '출판사'; 
  // const bookId = bookInfo?.isbn13 || bookInfo?.isbn;
  // const status = bookInfo?.status;
  const nowPage = bookInfo?.nowPage + 30;
  const progress = Math.floor((nowPage / bookInfo?.page) * 100);

  return (
    <>
    <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none', width: {xs: width} }}  >
      <BookCover image={bookInfo?.coverImage} alt={title + 'image'}
        customStyle={{ ...customStyle }}
      />
      <ProgressBar progress={progress} containerHeight={7} bg={'var(--main-color)'}  desc={false} />
        <div style={{ height: '42px', padding: '2px', margin: '5px 0' }} >
          <TitleTypography
            fontWeight={'700'} 
            fontSize={'12px'} 
            letterSpacing={'-0.5px'}
          >
            {title}
          </TitleTypography>
          <Typography fontSize={'8px'} color={'#AFB1B6'} letterSpacing={'-1px'}>
            {author}
          </Typography>
          {/* <Typography fontSize={'10px'} align='center' color={'black'} letterSpacing={'-1px'}>
            ({publisher})
          </Typography> */}
        </div>  
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