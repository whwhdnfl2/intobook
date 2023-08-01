import React, { useState } from 'react';
import SearchBottomSheet from '../components/bookSearch/SearchBottomSheet';
import { Layout } from './../styles/CommonStyle';
import { styled } from 'styled-components';
import { Character, HistoryLogs } from '../components/home';
import ReadingBook from './../components/home/ReadingBook';


const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => {
    setIsOpen(true);
  };

  // reocil 전역 상태에서 값 받아오기
  const nickname = '북빠';

  return (
    <Layout>
      <WelcomeText>Hello, {nickname}님-!</WelcomeText>
      <Character />
      <HistoryLogs />
      <ReadingBook />
      <div style={{ fontSize: '50px', margin: '0 20px', display: 'flex'}}
        onClick={clickHandler}
      >
        +
      </div>
      <SearchBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} clickHandler={clickHandler} />
    </Layout>
  );
};

const WelcomeText = styled.div`
  font-size: var(--font-h4);
  color: var(--main-green-color);
`

export default HomePage;