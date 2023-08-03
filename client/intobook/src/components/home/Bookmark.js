import React from 'react';
import { useRecoilState } from 'recoil';
import { BookmarkStatusAtom } from './../../recoil/bookmark/bookmarkAtom';
import { styled } from 'styled-components';
import bookmark_bright from '../../assets/img/home/bookmark_bright.png';
import bookmark_dark from '../../assets/img/home/bookmark_dark.png';

const Bookmark = () => {
  const [isBookmarkOut , setIsBookmarkOut] = useRecoilState(BookmarkStatusAtom);
  const imgSrc = isBookmarkOut ? bookmark_bright : bookmark_dark;

  // 블루투스 연결 상태 받아오는 핸들러
  const bookmarkHandler = async () => {
    // const bookmarkStatus = await getBookmarkStatus();
    const bookmarkStatus = !isBookmarkOut;
    setIsBookmarkOut(bookmarkStatus);
  };

  const BookmarkImg = styled.img`
    width: 172px;
    height: 196px;
    margin: 0 auto;
  `;

  const BookmarkText = styled.div`
    font-size: 16px;
    margin: 15px auto 10px auto;
  `;

  return ( 
    <>
      <BookmarkImg src={imgSrc} />
      <BookmarkText>
        { isBookmarkOut? '북갈피가 나와있어요' : '북갈피가 들어가있어요' }
      </BookmarkText>

    </>
  );
};

export default Bookmark;