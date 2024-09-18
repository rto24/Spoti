import { useState, useEffect } from 'react';

// Custom hook to format a UTC date to DD/MM format
const useFormatDate = (utcDate) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (utcDate) {
      // Parse the UTC date and format it to DD/MM
      const date = new Date(utcDate);
      const day = String(date.getUTCDate()).padStart(2, '0'); // Get the day and add leading zero if needed
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
      setFormattedDate(`${day}/${month}`);
    }
  }, [utcDate]);

  return formattedDate;
};

export default useFormatDate;
