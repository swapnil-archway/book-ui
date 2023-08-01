import React, { useEffect, useState } from 'react';

export const usePullToRefresh = (ref: React.RefObject<HTMLDivElement>, ajaxFunction: () => Promise<void>) => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const container = ref.current;

    const handlePullToRefresh = async () => {
      if (container?.scrollTop === 0) {
        setIsRefreshing(true);
        await ajaxFunction();
        setIsRefreshing(false);
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
