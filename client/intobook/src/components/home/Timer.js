import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { BluetoothAtom, BookmarkStatusAtom, ReadingBookAtom } from './../../recoil/bookmark/bookmarkAtom';
import { styled } from 'styled-components';

const Timer = () => {
  const isConnected = useRecoilValue(BluetoothAtom);
  const isBookmarkOut = useRecoilValue(BookmarkStatusAtom);
  const readingBook = useRecoilValue(ReadingBookAtom);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  let timer;

  useEffect(() => {
    if (isConnected && isBookmarkOut && readingBook) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timer = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 59) {
            setMinutes(prevMinutes => prevMinutes + 1);
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    }

    if (!isBookmarkOut) {
      setMinutes(0);
      setSeconds(0);
    }

    return () => clearInterval(timer);
  }, [isConnected, isBookmarkOut, readingBook]);

  if (!(isConnected && isBookmarkOut && readingBook)) {
    return null; // 조건이 충족되지 않을 때 렌더링하지 않음
  }

  return (
    <>
      <TimerDiv>
        <h2>{minutes < 10 ? '0' + minutes : minutes} : {seconds < 10? '0' + seconds : seconds}</h2>
      </TimerDiv>
    </>
  );
};

const TimerDiv = styled.div`
  width: 320px;
  height: 124px;
  background-color: var(--main-color);
  border-radius: 20px;
  margin-bottom: 20px;
  text-align: center;
`

export default Timer;