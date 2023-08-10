import axiosInstance from './axiosConfig';

// 로그 조회하기
export const getBookHistory = async (userBookPk, page) => {
  try {
    const res = await axiosInstance.get(`/historys/userBook`, {
      params: {
        userBookPk: userBookPk,
        page: page,
      },
    });
    return res.data;
  } catch (err) {
    return err
  }
};

// 로그 수정하기
export const editBookHistory = async (historyPk, startTime, endTime, comment) => {
  try {
    const res = await axiosInstance.patch(`/historys/${historyPk}`, null, {
      params: {
        startTime,
        endTime,
        comment,
      },
    })
    console.log(res.data)
    return res.data;
  } catch (err) {
    return err
  }
};

// 로그 삭제하기
export const deleteBookHistory = async (historyPk) => {
  try {
    const res = await axiosInstance.delete(`/historys/${historyPk}`)
    return res.data;
  } catch (err) {
    return err
  }
};

//로그 시작 기록하기(히스토리 생성)
export const createBookHistory = async (userBookPk) => {
  try {
    const res = await axiosInstance.post(`historys/${userBookPk}`)
    return res.data;
  } catch (err) {
    return err
  }
}

//로그 종료 생성하기
export const completeBookHistory = async (historyPk,pressure) => {
  try {
    const res = await axiosInstance.post(`historys/updateHistoryPressure/${historyPk}`,null,{
      params: {
      pressure
    }}
    )
    return res.data;
  } catch (err) {
    return err
  }
}