import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import { useRecoilState } from "recoil";
import { updateUsername } from '../../api/usernameAPI';
import { UserNameAtom } from '../../recoil/user/UserAtom';


const UpdateUsername = ({ closeModal }) => {
  const [newUsername, setNewUsername] = useState('');
  const [username, setUsername] = useRecoilState(UserNameAtom);

  const handleUpdate = async () => {
    try {
      const updatedUsername = await updateUsername(newUsername);
      setUsername(updatedUsername); // Recoil 상태 업데이트
      closeModal(); // 모달 닫기
      console.log(username)
    } catch (error) {
      console.error('유저네임 업데이트 에러:', error);
    }
  };

  return (
    <ModalContent>
      <p>현재 유저네임: {username}</p>
      <TextField
        label="새 유저네임"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <StyledButton variant="contained" onClick={handleUpdate}>
        유저네임 업데이트
      </StyledButton>
    </ModalContent>
  );
};

const ModalContent = styled.div`
  min-width: 240px;
  background-color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 여기 왜 important안하면 적용이 안될까
const StyledButton = styled(Button)`
  margin-top: 20px !important;
`;

export default UpdateUsername;
