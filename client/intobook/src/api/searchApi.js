import axiosInstance from './axiosConfig';

export const searchBooks = async (keyword, start) => {
  try {
    const res = await axiosInstance.get(`/books/list`, {
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