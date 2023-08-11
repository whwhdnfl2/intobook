import axiosInstance from "./axiosConfig";

// fcmToken 불러오기
export const transmitFCMtoken = async (fcmtoken) => {
    // console.log('와이',fcmtoken)
    try {
    const res = await axiosInstance.post(`/users/transmitFcmToken`, fcmtoken);
    return res.data;
    } catch (err) {
        return err;
    }
};