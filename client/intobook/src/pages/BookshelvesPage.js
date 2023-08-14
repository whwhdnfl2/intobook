import React, { useState } from 'react';
import { Typography } from '@mui/material';
import BookshelvesMain from '../components/bookShelves/BookshelvesMain';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Layout, StyleSecondContainer } from './../styles/CommonStyle';
import { useRecoilValue } from "recoil";
import { UserNameAtom } from '../recoil/user/UserAtom';


const BookshelvesPage = () => {
  const username = useRecoilValue(UserNameAtom);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Layout>
        <StyleSecondContainer>
          {<p>{username}님의 책장</p>}
          <BookshelvesMain />
        </StyleSecondContainer>
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
  color: var(--main-base-color);
`;

export default BookshelvesPage;