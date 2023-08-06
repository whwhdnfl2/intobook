import axiosInstance from './axiosConfig';

// 히스토리 조회하기
export const getBookHistory = async (userBookPk, page) => {
  try {
    const res = await axiosInstance.get(`/historys/userBook`, {
      params: {
        userBookPk: userBookPk,
        page: page,
      },
    });
    return res.data;
  } catch (err) {
    return err
  }
};

// 로그 삭제하기
export const deleteBookHistory = async (userBookPk) => {
  try {
    const res = await axiosInstance.delete(`/historys`, {
      params: {
        userBookPk: userBookPk,
      },
    });
    return res.data;
  } catch (err) {
    return err
  }
};