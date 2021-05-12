/**
 * title: 基础用法
 * desc: 无限滚动列表
 */

import React, { useState, useRef } from 'react';
import { useInfiniteScroll } from 'my-hooks';

export default () => {
  const [state, setstate] = useState<any[]>([]);
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

  const { loadingProps, disconnect } = useInfiniteScroll(onEndReached);

  return (
    <div style={{ height: 400, overflowY: 'auto' }}>
      {state.map(item => (
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
