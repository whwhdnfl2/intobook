import React, { useEffect, useState } from 'react';
import { ProgressBar } from '../common';
import BookTotalStatistics from './BookTotalStatistics';
import AverageStatistics from '../common/AverageStatistics';
import { getUserBookStatistics } from './../../api/statisticsApi';

const BookStatistics = ({ bookInfo }) => {
  const [statisticsValue, setStatisticsValue] = useState({});
  const userBookId = bookInfo?.userBookPk;

  useEffect(() => {
    try {
      updateUserBookStatistics(userBookId)
        .then(val => {
          setStatisticsValue(val);
        });
    } catch (err) {
      console.error(err);
    }
  }, [userBookId])

  const updateUserBookStatistics = async (userBookPk) => {
    const res = await getUserBookStatistics(userBookPk);
    return res;
  };

  const nowPage = 150;  // 추후 변경 필요 bookInfo?.nowPage
  const progress = Math.floor((nowPage / bookInfo?.page) * 100);
  const avgReadingTime = statisticsValue?.averageReadingTime;
  const readingSpeed = statisticsValue?.averageSpeed;
  const status = bookInfo?.status

  return (
    <div>
      <ProgressBar progress={progress} containerWidth={300} />
      <BookTotalStatistics val={statisticsValue} status={status} />
      <AverageStatistics readingTime={avgReadingTime} readSpeed={readingSpeed} />
    </div>
  );
};

export default BookStatistics;