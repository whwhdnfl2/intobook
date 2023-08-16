import React, { useEffect, useState } from 'react';
import BookTotalStatistics from './BookTotalStatistics';
import AverageStatistics from '../common/AverageStatistics';
import { getUserBookStatistics } from './../../api/statisticsApi';

const BookStatistics = ({ userBookId, status }) => {
  const [statisticsValue, setStatisticsValue] = useState({});

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
    return res.data;
  };

  const avgReadingTime = statisticsValue?.averageReadingTime;
  const readingSpeed = statisticsValue?.averageSpeed;

  return (
    <div>
      <BookTotalStatistics val={statisticsValue} status={status} />
      <AverageStatistics readingTime={avgReadingTime} readSpeed={readingSpeed} />
    </div>
  );
};

export default BookStatistics;