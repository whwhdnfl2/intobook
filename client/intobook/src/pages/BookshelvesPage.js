import React from 'react';
import {Typography} from '@mui/material';
import BookshelvesMain from '../components/bookShelves/BookshelvesMain';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Layout } from './../styles/CommonStyle';


const BookshelvesPage = () => {
  const username = "북빠"
  
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    >
      <Layout>
        <TitleContainer>
          {<TitleTypography>{username}님의 책장</TitleTypography>}
        </TitleContainer>
        <BookshelvesMain />
      </Layout>
    </motion.div>
  );
}

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const TitleTypography = styled(Typography)`
  variant : h5;
  component : h1;
  color: var(--main-color);
`;

export default BookshelvesPage;