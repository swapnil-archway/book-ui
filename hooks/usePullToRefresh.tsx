import React, { useEffect, useState } from 'react';

export const usePullToRefresh = (ref: React.RefObject<HTMLDivElement>) => {
  const [isRefreshing, setIsRefreshing] = useState<Boolean>(false);

  useEffect(() => {
    const container = ref.current;

    const handlePullToRefresh = () => {
      if (container?.scrollTop === 0) {
        setIsRefreshing(true);
        setTimeout(() => {
          setIsRefreshing(false);
        }, 1000);
      }
    };

    if (container) {
      container.addEventListener('dragend', handlePullToRefresh);
      container.addEventListener('touchend', handlePullToRefresh);
    }

    return () => {
      if (container) {
        container.removeEventListener('dragend', handlePullToRefresh);
        container.removeEventListener('touchend', handlePullToRefresh);
      }
    };
  }, []);

  return isRefreshing;
};
