import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';

dayjs.extend(relativeTime);

const Date = ({ date }) => {
  const [relativeDate, setRelativeDate] = useState(dayjs().to(date));
  useEffect(() => {
    const interval = setInterval(() => setRelativeDate(dayjs().to(date)), 1000);
    return () => clearInterval(interval);
  }, []);

  return relativeDate;
};

export default Date;
