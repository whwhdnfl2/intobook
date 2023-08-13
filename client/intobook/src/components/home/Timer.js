import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { BluetoothAtom, BookmarkStatusAtom, ReadingBookAtom } from './../../recoil/bookmark/bookmarkAtom';
import { styled } from 'styled-components';
import { css, keyframes } from 'styled-components';

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

    if (!isBookmarkOut || !isConnected) {
      setMinutes(0);
      setSeconds(0);
    }

    return () => clearInterval(timer);
  }, [isConnected, isBookmarkOut, readingBook]);

  if (!(isConnected && isBookmarkOut && readingBook)) {
    return null; // 조건이 충족되지 않을 때 렌더링하지 않음
  }

  return (
      <TimerDiv
      isActive={(isConnected && isBookmarkOut && readingBook)}
      >
        <h2>{minutes < 10 ? '0' + minutes : minutes} : {seconds < 10? '0' + seconds : seconds}</h2>
      </TimerDiv>
  );
};

const floatAnimation = keyframes`
  0%, 100% {
    transform: translate(0, -5px);
  }
  50% {
    transform: translate(0, 5px);
  }
`;

const TimerDiv = styled.div`
  width: 360px;
  height: 124px;
  border-radius: 100px;
  margin-bottom: 20px;
  text-align: center;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  background: linear-gradient(45deg, rgba(255, 167, 90, 0.4), rgba(135, 206, 235, 0.4));

  ${props =>
    props.isActive &&
    css`
      animation: ${floatAnimation} 2s infinite;
      animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
      box-shadow: 0 0 2x;
    `}
`

export default Timer;