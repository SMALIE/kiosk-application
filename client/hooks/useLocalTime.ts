import { useEffect, useRef, useState } from 'react';

function getFormattedTime(): string {
  const raw = new Date().toLocaleTimeString('pl-PL', {
    timeZone: 'Europe/Warsaw',
    hour: '2-digit',
    minute: '2-digit',
  });

  const [h = '', m = ''] = raw.split(':');
  return `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
}

export function useLocalTime(): string {
  const [time, setTime] = useState(() => getFormattedTime());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const update = () => setTime(getFormattedTime());

    const now = new Date();
    const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    const timeoutId = setTimeout(() => {
      update();
      intervalRef.current = setInterval(update, 60_000);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return time;
}
