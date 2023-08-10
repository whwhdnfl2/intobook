import axiosInstance from './axiosConfig';

// 책별 통계 가져오기
export const getUserBookStatistics = async (userBookPk) => {
  try {
    const res = await axiosInstance.get(`/statistics/userBook/${userBookPk}`);
    return res.data;
  } catch (err) {
    return err
  }
};