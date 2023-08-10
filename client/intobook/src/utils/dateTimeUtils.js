export   function formatDate(originDate) {
  const date = new Date(originDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}.${month}.${day}`;
  
  return formattedDate;
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

