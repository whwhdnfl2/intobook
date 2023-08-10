import React, { useState, useEffect } from 'react';
import { AverageStatistics } from "../components/common";
import { BookCharacter, TotalStatistic, WeeklyStatistic } from './../components/userStatistics';
import { getUserStatistics } from '../api/statisticsApi';
import { motion } from 'framer-motion';

const StatisticsPage = () => {
  const username = "zaru"

  // 유저 통계 api 요청
  const [userStatisticsValue, setUserStatisticValue] = useState({});

  useEffect(()=>{
    try {
      updateUserStatistics()
        .then(val => {
          setUserStatisticValue(val);
        });
    } catch (err) {
      console.log("에러남 ㄱ-");
    }
  }, []);

  const updateUserStatistics = async ()=> {
    const res = await getUserStatistics();
    return res;
  };

  // 평균 통계 데이터
  const pagePerHour = userStatisticsValue?.pagePerHour;
  const timePerRead = userStatisticsValue?.timePerRead;

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <div>
        {username} 님의 독서 유형은..
        <BookCharacter />
        <TotalStatistic val={userStatisticsValue}  />
        <WeeklyStatistic />
        <AverageStatistics readingTime={timePerRead} readSpeed={pagePerHour} />
      </div>
    </motion.div>
  );
}

export default StatisticsPage;