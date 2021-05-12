/**
 * title: 基础用法
 * desc: 滚动一定的距离，切换到其他页面，然后再回来看看吧。
 */

import React, { useEffect, useState, useRef } from 'react';
import { useInfiniteScroll, useCallbackState, useUnmount } from 'my-hooks';

export default () => {
  const [state, setstate] = useCallbackState<any[]>([]);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const page = useRef<number>(1);

  const onEndReached = () => {
    if (page.current >= 10) {
      setIsEnd(true);
      disconnect && disconnect();
      return;
    }
    setTimeout(() => {
      setstate(Array.from(Array(page.current++ * 10).keys()));
    }, 300);
  };

  const {
    wrapperProps,
    loadingProps,
    disconnect,
    getScrollTop,
    setScrollTop,
  } = useInfiniteScroll(onEndReached);

  useEffect(() => {
    const top = window.demo3ScrollTop;
    const data = window.demo3State;
    if (top) {
      page.current = data.length / 10 + 1;
      setstate(data, () => setScrollTop(top));
      delete window.demo3ScrollTop;
      delete window.demo3State;
    }
  }, []);

  useUnmount(() => {
    // 业务中可以把数据放入redux中保存
    window.demo3ScrollTop = getScrollTop();
    window.demo3State = state;
  });

  return (
    <div {...wrapperProps} style={{ height: 400, overflowY: 'auto' }}>
      {state.map((item: string) => (
        <div
          style={{
            height: 52,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid #e8e8e8',
            marginBottom: 8,
          }}
          key={item}
        >
          {`row key: ${item}`}
        </div>
      ))}
      <div
        {...loadingProps}
        style={{
          height: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isEnd ? '没有更多了' : 'loading...'}
      </div>
    </div>
  );
};

declare const window: any;
