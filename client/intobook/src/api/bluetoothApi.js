import axiosInstance from './axiosConfig';

export const getBluetoothStatus = async () => {
  try {
    const res = await axiosInstance.get(`/bluetooth`);
    return res.data;
  } catch (err) {
    return err
  }
};