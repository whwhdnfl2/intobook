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

// 책 상세 정보 불러오기
// export const getBookDetail = async (isbn) => {
//   try {
//     const res = await axiosInstance.get(`/books/${isbn}`);
//     return res.data;
//   } catch (err) {
//     return err
//   }
// };