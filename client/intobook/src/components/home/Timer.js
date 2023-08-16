import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BluetoothAtom, BookmarkStatusAtom, ReadingBookAtom, TimerStartTimeAtom } from './../../recoil/bookmark/bookmarkAtom';
import { css, keyframes } from 'styled-components';
import { styled } from 'styled-components';


const Timer = () => {
  const isConnected = useRecoilValue(BluetoothAtom);
  const isBookmarkOut = useRecoilValue(BookmarkStatusAtom);
  const readingBook = useRecoilValue(ReadingBookAtom);

  const [timerValue, setTimerValue] = useState({ minutes: 0, seconds: 0 });
  const [timerStartTime, setTimerStartTime] = useRecoilState(TimerStartTimeAtom);

  useEffect(() => {
    let timer = null;

    if (isConnected && isBookmarkOut && readingBook) {
      if (!timerStartTime) {
        setTimerStartTime(Date.now()); // Timer 시작 시간을 저장
      }

      timer = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - timerStartTime;

        const minutes = Math.floor(elapsedTime / (1000 * 60));
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

        setTimerValue({ minutes, seconds });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
      if (!(isConnected && isBookmarkOut && readingBook)) {
        setTimerStartTime(null);
        setTimerValue({ minutes: 0, seconds: 0 });
      }
    };
  }, [isConnected, isBookmarkOut, readingBook, timerStartTime, setTimerStartTime]);

  return (
    <div>
      {isConnected && isBookmarkOut && readingBook && (
        <TimerDiv isactive={(isConnected && isBookmarkOut && readingBook)}>
          <h2>
            {timerValue.minutes < 10 ? '0' + timerValue.minutes : timerValue.minutes} :{' '}
            {timerValue.seconds < 10 ? '0' + timerValue.seconds : timerValue.seconds}
          </h2>
          <p>오늘의 독서 시간이 채워지고 있어요</p>
        </TimerDiv>
      )}
    </div>
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
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(45deg, rgba(255, 167, 190, 0.5), rgba(135, 206, 235, 0.7));

  ${props =>
    props.isactive &&
    css`
      animation: ${floatAnimation} 2s infinite;
      animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    `}
`

export default Timer;