import React from 'react';
import { useRecoilValue } from 'recoil';
import { BookmarkStatusAtom, BluetoothAtom } from './../../recoil/bookmark/bookmarkAtom';
import { bookmark, bookmarkBright, bookmarkDark } from './../../assets/img/home/index'
import { styled } from 'styled-components';

const Bookmark = () => {
  const isConnected= useRecoilValue(BluetoothAtom);
  const isBookmarkOut = useRecoilValue(BookmarkStatusAtom);

  const imgSrc = !isConnected
    ? bookmark
    : isBookmarkOut
    ? bookmarkBright
    : bookmarkDark;

  return (
    <>
      <BookmarkImg src={imgSrc} />
      <BookmarkText>
        {isConnected
          ? isBookmarkOut
            ? '북갈피가 나와있어요'
            : '북갈피가 들어가있어요'
          : '북갈피가 어디있는지 모르겠어요'
        }
      </BookmarkText>
    </>
  );
};

const BookmarkImg = styled.img`
  width: 172px;
  height: 196px;
  margin: 0 auto;
`;

const BookmarkText = styled.div`
  font-size: 16px;
  margin: 15px auto 20px auto;
`;

export default Bookmark;