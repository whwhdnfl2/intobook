import React from 'react';
import {Typography} from '@mui/material';
import BookshelvesMain from '../components/bookShelves/BookshelvesMain';
import styled from 'styled-components';
import { Layout } from './../styles/CommonStyle';


const BookshelvesPage = () => {
  const username = "능이"
  
  return (
    <Layout>
      {<TitleTypography>{username}님의 책장</TitleTypography>}
      <BookshelvesMain />
    </Layout>
  );
}

const TitleTypography = styled(Typography)`
  variant : h5;
  component : h1;
  color: var(--main-color);
`;

export default BookshelvesPage;