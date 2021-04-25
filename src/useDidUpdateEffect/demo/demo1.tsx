/**
 * title: 基础用法
 * desc: 使用上与 useEffect 完全相同，只是它忽略了首次渲染，只在依赖项更新时运行, 且可以在effect第一个参数上获取上一次的依赖项。
 */

import React, { useState, DependencyList } from 'react';
import { useDidUpdateEffect } from 'my-hooks';

export default () => {
  const [count, setCount] = useState<number>(0);
  const [prevDeps, setPrevDeps] = useState<DependencyList>();

  useDidUpdateEffect(
    (prevDeps?: DependencyList) => {
      setPrevDeps(prevDeps);
      return () => {
        // do something
      };
    },
    [count],
  ); // you can include deps array if necessary

  return (
    <div>
      <p>prevDeps: {prevDeps ? JSON.stringify(prevDeps) : ''}</p>
      <p>currentDeps: {count}</p>
      <p>
        <button type="button" onClick={() => setCount(c => c + 1)}>
          reRender
        </button>
      </p>
    </div>
  );
};
