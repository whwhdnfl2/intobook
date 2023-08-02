import axiosInstance from './axiosConfig';

export const searchBookDetail = async (isbn) => {
  try {
    const res = await axiosInstance.get(`/books/${isbn}`);
    return res.data;
  } catch (err) {
    return err
  }
};