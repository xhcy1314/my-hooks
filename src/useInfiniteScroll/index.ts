import { useEffect, useRef, useState, useMemo } from 'react';
import 'intersection-observer';
import { usePersistFn } from 'ahooks';

export interface Result {
  loadingProps: {
    ref: (ele: any) => void;
  };
  wrapperProps: {
    ref: (ele: any) => void;
  };
  disconnect: () => void;
  getScrollTop: () => number;
  setScrollTop: (top: number) => void;
}

export type UseInfiniteScroll = (
  onEndReached: () => any,
  options: {
    direction: 'up' | 'down';
    root?: HTMLElement | null;
  },
) => Result;

const defaultOptions = {
  direction: 'up',
};

const useInfiniteScroll: UseInfiniteScroll = (onEndReached, options) => {
  const { direction, root } = {
    ...defaultOptions,
    ...options,
  };

  const loadingRef = useRef<HTMLElement | null>();
  const wrapperRef = useRef<HTMLElement | null | undefined>(root);
  wrapperRef.current = root;
  const prevScrollHeight = useRef<number>(0);
  const [disconnect, setDisconnect] = useState<() => void>(() => {});

  const setScrollTop = usePersistFn((top: number) => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTop = top;
    }
  });

  const getScrollTop = usePersistFn(() => wrapperRef.current?.scrollTop || 0);

  useEffect(() => {
    if (!loadingRef.current) {
      return () => {};
    }

    const observer = new IntersectionObserver(async entries => {
      for (const entry of entries) {
        if (entry.isIntersecting && onEndReached) {
          await onEndReached();
          const scroller = wrapperRef.current;
          // 下拉滚动加载效果
          if (scroller && direction === 'down') {
            scroller.scrollTop =
              scroller.scrollHeight - prevScrollHeight.current;
            prevScrollHeight.current = scroller.scrollHeight || 0;
          }
        }
      }
    });

    observer.observe(loadingRef.current as HTMLElement);

    setDisconnect(() => () => {
      observer.unobserve(loadingRef.current as HTMLElement);
      observer.disconnect();
    });

    return () => {
      observer.disconnect();
    };
  }, [loadingRef.current]);

  return {
    loadingProps: {
      ref: (ele: any) => {
        loadingRef.current = ele;
      },
    },
    wrapperProps: {
      ref: (ele: any) => {
        wrapperRef.current = ele;
      },
    },
    disconnect,
    getScrollTop,
    setScrollTop,
  };
};

export default useInfiniteScroll;
