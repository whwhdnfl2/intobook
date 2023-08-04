import axiosInstance from './axiosConfig';

export const userbooks = async (Autorization, orderedBy, page, status) => {
  try {
    const res = await axiosInstance.get(`/userbook`, {
      params: {
        Autorization: Autorization,
        orderedBy: orderedBy,
        page: page,
        status: status
      },
    });
    return res.data;
  } catch (err) {
    return err
  }
};

// 현재 읽고 있는 책 불러오기
// export const readingBookInfo = async (keyword, start) => {
//   try {
//     const res = await axiosInstance.get(`/books`, {
//       params: {
//         keyword: keyword,
//         start: start,
//       },
//     });
//     return res.data;
//   } catch (err) {
//     return err
//   }
// };