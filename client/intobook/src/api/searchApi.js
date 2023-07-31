import axiosInstance from './axiosConfig';

export const searchBooks = async (keyword, start) => {
  try {
    const res = await axiosInstance.get(`/books`, {
      params: {
        keyword: keyword,
        start: start,
      },
    });
    return res.data;
  } catch (err) {
    return err
  }
};