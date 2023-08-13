import axiosInstance from './axiosConfig';

// 닉네임 가져오기
export const getUsername = async () => {
  try {
    const res = await
    axiosInstance.get(`/users/nickname`);
    return res.data;
  } catch (err) {
    return err
  }
};

// 닉네임 수정하기
export const updateUsername = async (nickname) => {
  try {
    const res = await
    axiosInstance.patch(`/users/updateNickname`, null, {
      params: {
        nickname: nickname,
      }
    });
    return res.data;
  } catch (err) {
    return err
  }
};