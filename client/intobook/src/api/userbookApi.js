import axiosInstance from './axiosConfig';

export const userbooks = async (orderedBy, page, status) => {
  try {
    const res = await axiosInstance.get(`/userbook`, {
      params: {
        // Autorization: Autorization,
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
export const getReadingBookInfo = async () => {
  try {
    const res = await axiosInstance.get(`/userbook/nowreading`);
    return res.data;
  } catch (err) {
    return err
  }
};