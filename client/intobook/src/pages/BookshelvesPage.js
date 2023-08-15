import React, { useState } from 'react';
import { Typography } from '@mui/material';
import BookshelvesMain from '../components/bookShelves/BookshelvesMain';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Layout, LayoutForth, StyleSecondContainer } from './../styles/CommonStyle';
import { useRecoilValue } from "recoil";
import { UserNameAtom } from '../recoil/user/UserAtom';


const BookshelvesPage = () => {
  const username = useRecoilValue(UserNameAtom);

  return (
    <motion.div
      initial={{ x: '-100%' }} // 왼쪽에서 나타나는 효과
      animate={{ x: 0 }} // 화면 안쪽으로 이동하여 나타나는 효과
      exit={{ x: '100%' }} // 오른쪽으로 사라지는 효과
    >
      <LayoutForth>
        <StyleSecondContainer>
          {<p>{username}님의 책장</p>}
          <BookshelvesMain />
        </StyleSecondContainer>
      </LayoutForth>
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