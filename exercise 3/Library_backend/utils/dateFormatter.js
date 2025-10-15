import dayjs from 'dayjs';

export const formatDateTime = (date) => {
  if (!date) return null;
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

export const formatDate = (date) => {
  if (!date) return null;
  return dayjs(date).format('YYYY-MM-DD');
};

