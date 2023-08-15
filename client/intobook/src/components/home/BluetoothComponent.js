import { useRecoilState, useRecoilValue } from "recoil";
import {
  BluetoothAtom,
  BookmarkStatusAtom,
} from "../../recoil/bookmark/bookmarkAtom";
import BookmarkCharacter from "../character/CharacterWrapper";
import { useState } from "react";
import { styled } from "styled-components";
import { UserNameAtom } from "../../recoil/user/UserAtom";
import CharacterStatistic from './../character/CharacterStatistic';

const BluetoothComponent = () => {
  const [bluetoothStatus, setBluetoothStatus] = useRecoilState(BluetoothAtom);
  const [bookmarkStatus, setBookmarkStatus] =
    useRecoilState(BookmarkStatusAtom);
    
  const username = useRecoilValue(UserNameAtom);

  let StatusText = "";

  if (bluetoothStatus) {
    if (bookmarkStatus) {
      StatusText = "책갈피가 밖에 나왔어요, 독서중이시죠?";
    } else {
      StatusText = "책갈피가 책 속에 들어가 있어요";
    }
  } else {
    StatusText = "책갈피와 함께 책에 푹 빠지는 경험을 해보세요:)";
  }

  return (
    <>
      {<StatueText>안녕하세요, {username}님</StatueText>}
      <BookmarkCharacter bluetoothStatus={bluetoothStatus} bookmarkStatus={bookmarkStatus}/>
      <StatueText>{StatusText}</StatueText>
    </>
  );
};

const StatueText = styled.div`
  color: white;
  font-size: var(--font-h6);
`;

export default BluetoothComponent;
