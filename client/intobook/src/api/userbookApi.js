import axiosInstance from './axiosConfig';

export const userbooks = async (orderedBy, page, status) => {
  try {
    const res = await axiosInstance.get(`/userbook`, {
      params: {
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