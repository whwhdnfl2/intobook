export function formatDate(originDate, type) {
  const date = new Date(originDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  const month_2 = String(date.getMonth() + 1).padStart(2, '0');
  const day_2 = String(date.getDate()).padStart(2, '0');

  if (type === 'dateDot') {
    const formattedDate = `${year}.${month_2}.${day_2}`;
    return formattedDate;
  } else if (type === 'dateLetter') {
    const formattedDate = `${year}년 ${month}월 ${day}일`;
    return formattedDate;
  }
}

export function formatTimeInDate(originDate) {
  const dateTime = new Date(originDate);
  const hours = dateTime.getHours().toString().padStart(2, '0');
  const minutes = dateTime.getMinutes().toString().padStart(2, '0');

  const formattedTime = `${hours}:${minutes}`;
  return formattedTime;
}

export function formatTime(time) {
  const days = Math.floor(time / (60 * 24));
  const hours = Math.floor((time % (60 * 24)) / 60);
  const remainingMinutes = time % 60;

  let formatted = '';
  if (days > 0) {
    formatted += `${days}일 `;
  }
  if (hours > 0) {
    formatted += `${hours}시간 `;
  }
  if (remainingMinutes > 0) {
    formatted += `${remainingMinutes}분`;
  }

  return formatted.trim();
}

export function formatTimeDifference(lastDate) {
  const currentDate = new Date();
  const previousDate = new Date(lastDate);

  console.log('시간 확인', currentDate, previousDate);
  const timeDifference = Math.floor((currentDate - previousDate) / 1000); // 차이를 초로 계산

  if (timeDifference < 60) {
    return `${timeDifference}초`;
  } else if (timeDifference < 3600) {
    const minutes = Math.floor(timeDifference / 60);
    return `${minutes}분`;
  } else if (timeDifference < 86400) {
    const hours = Math.floor(timeDifference / 3600);
    const minutes = Math.floor((timeDifference % 3600) / 60);
    return `${hours}시간 ${minutes}분`;
  } else {
    const days = Math.floor(timeDifference / 86400);
    const hours = Math.floor((timeDifference % 86400) / 3600);
    const minutes = Math.floor((timeDifference % 3600) / 60);
    return `${days}일 ${hours}시간 ${minutes}분`;
  }
}