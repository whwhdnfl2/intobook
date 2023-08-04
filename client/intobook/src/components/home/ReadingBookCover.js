import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ReadingBookAtom } from './../../recoil/bookmark/bookmarkAtom';

const ReadingBookCover = () => {
  const [nowReading, setNowReading] = useRecoilState(ReadingBookAtom);

  // useEffect(() =>  {
  //   const getReadingBook = async () => {
  //     const detailInfo = await getReadingBookInfo();
  //     setNowReading(prevState => ({
  //       ...prevState,
  //       userBookPk: detailInfo.userBookPk,
  //       title: detailInfo.title,
  //       author: detailInfo.author,
  //       bookCover: detailInfo.bookCover,
  //       isbn: detailInfo.isbn
  //     }));
  //   };
  //   getReadingBook();
  
  // }, [setNowReading]);

  return (
    <div>
      
    </div>
  );
};

export default ReadingBookCover;