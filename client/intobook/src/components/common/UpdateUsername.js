import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import { useRecoilState } from "recoil";
import { updateUsername } from '../../api/usernameAPI';
import { UserNameAtom } from '../../recoil/user/UserAtom';

const UpdateUsername = ({ closeModal }) => {
  const [username, setUsername] = useRecoilState(UserNameAtom);
  const [newUsername, setNewUsername] = useState('');

  const handleUpdate = async () => {
    try {
      await updateUsername(newUsername);
    } catch (error) {
      console.error('유저네임 업데이트 에러:', error);
    } finally {
      setUsername(newUsername);
      closeModal();
    }
  };

  return (
    <ModalContent>
      <p>현재 닉네임: {username}</p>
      <TextField
        label="1~12자 내외의 닉네임"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleUpdate();
          }
        }}
        inputProps={{ maxLength: 12 }}
      />
      <StyledButton variant="contained" onClick={handleUpdate} disabled={newUsername.trim() === ''}>
        변경하기
      </StyledButton>
    </ModalContent>
  )
};

const ModalContent = styled.div`
  min-width: 240px;
  background-color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  margin-top: 20px !important;
`;

export default UpdateUsername;