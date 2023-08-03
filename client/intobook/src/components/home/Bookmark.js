import React from 'react';
import { useRecoilState } from 'recoil';
import { BookmarkStatusAtom, BluetoothAtom } from './../../recoil/bookmark/bookmarkAtom';
import { styled } from 'styled-components';
import bookmark_bright from '../../assets/img/home/bookmark_bright.png';
import bookmark_dark from '../../assets/img/home/bookmark_dark.png';
import bookmark from '../../assets/img/home/bookmark.png';

const Bookmark = () => {
  const [isConnected, setIsConnected] = useRecoilState(BluetoothAtom);
  const [isBookmarkOut, setIsBookmarkOut] = useRecoilState(BookmarkStatusAtom);
  // const isConnected = false;
  const imgSrc = !isConnected
    ? bookmark
    : isBookmarkOut
    ? bookmark_bright
    : bookmark_dark;


  // 블루투스 연결 상태 받아오는 핸들러
  const bookmarkHandler = async () => {
    // const bookmarkStatus = await getBookmarkStatus();
    const bookmarkStatus = !isBookmarkOut;
    const bluetoothStatus = !isConnected;
    setIsBookmarkOut(bookmarkStatus);
    setIsConnected(bluetoothStatus);
  };

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