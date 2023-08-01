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