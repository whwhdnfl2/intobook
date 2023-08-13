import React, { useState, useEffect } from 'react';
import { AverageStatistics } from "../components/common";
import { RecentStatistic, TotalStatistic, WeeklyStatistic } from './../components/userStatistics';
import { getUserStatistics, getWeeklyStatistics, getCharacterStatistics } from '../api/statisticsApi';
import { motion } from 'framer-motion';
import { Layout, LayoutSecond, StyleContainer } from '../styles/CommonStyle';
import { useRecoilValue } from "recoil";
import { UserNameAtom } from '../recoil/user/UserAtom';

const StatisticsPage = () => {
  const username = useRecoilValue(UserNameAtom);


  // 캐릭터 통계 api 요청
  const [characterValue, setCharacterValue] = useState({});

  useEffect(() => {
    try {
      updateCharacter()
        .then(val => {
          setCharacterValue(val);
        });
    } catch (err) {
      console.log("에러남 ㄱ-");
    }
  }, []);

  const updateCharacter = async () => {
    const res = await getCharacterStatistics();
    return res;
  };

  // 유저 통계 api 요청
  const [userStatisticsValue, setUserStatisticValue] = useState({});

  useEffect(() => {
    try {
      updateUserStatistics()
        .then(val => {
          setUserStatisticValue(val);
        });
    } catch (err) {
      console.log("에러남 ㄱ-");
    }
  }, []);

  const updateUserStatistics = async () => {
    const res = await getUserStatistics();
    return res;
  };

  // 주간 통계 api 요청
  const [weeklyStatisticsValue, setWeeklyStatisticValue] = useState({});

  useEffect(() => {
    try {
      updateWeeklyStatistics()
        .then(val => {
          setWeeklyStatisticValue(val);
        });
    } catch (err) {
      console.log("에러남 ㄱ-");
    }
  }, []);

  const updateWeeklyStatistics = async () => {
    const res = await getWeeklyStatistics();
    return res;
  };

  // 주간 통계 데이터
  const thisWeek = weeklyStatisticsValue?.weeks?.[0]
  const lastWeek = weeklyStatisticsValue?.weeks?.[1]

  // 평균 통계 데이터
  const pagePerHour = userStatisticsValue?.pagePerHour;
  const timePerRead = userStatisticsValue?.timePerRead;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LayoutSecond>
        <StyleContainer>
          {<p style={{color: 'white'}}>{username} 님의 독서 유형은..</p>}
          <RecentStatistic characterData={characterValue} />
          <TotalStatistic val={userStatisticsValue}  />
          <WeeklyStatistic thisWeek={thisWeek} lastWeek={lastWeek} />
          <AverageStatistics readingTime={timePerRead} readSpeed={pagePerHour} />
        </StyleContainer>
      </LayoutSecond>
    </motion.div>
  );
}

export default StatisticsPage;
