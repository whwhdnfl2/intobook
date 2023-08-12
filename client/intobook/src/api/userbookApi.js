import axiosInstance from './axiosConfig';

export const userbooks = async (orderBy, page, status) => {
  try {
    const res = await axiosInstance.get(`/userbook`, {
      params: {
        // Autorization: Autorization,
        orderBy: orderBy,
        page: page,
        status: status
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// 읽을 책 등록하기
export const addUserBook = async (isbn) => {
  try {
    const res = await axiosInstance.post(`/userbook`, null, {
      params: {
        isbn: isbn
      }
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// 현재 읽고 있는 책 불러오기
export const getReadingBookInfo = async () => {
  try {
    const res = await axiosInstance.get(`/userbook/nowreading`);
    return res.data;
  } catch (err) {
    return err;
  }
};

// 책장에 등록된 책 정보 불러오기
export const getUserBookInfo = async (userBookId) => {
  try {
    const res = await axiosInstance.get(`/userbook/${userBookId}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

// 책장에 등록된 책 상태 변경하기
export const updateUserBookStatus = async (userBookId, status) => {
  try {
    const res = await axiosInstance.patch(`/userbook/${userBookId}`, null, {
      params: {
        status: status
      }
    });
    return res.data;
  } catch (err) {
    return err;
  }
};