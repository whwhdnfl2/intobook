import axiosInstance from './axiosConfig';

// 로그아웃하기
export const logout = async () => {
    try {
        const res = await axiosInstance.get(`/users/logout`);
        return res.data;
    } catch (err) {
        return err
    }
};