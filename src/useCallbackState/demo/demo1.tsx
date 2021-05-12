/**
 * title: 基础用法
 * desc: state改变后执行回调
 */

import React from 'react';
import { useCallbackState } from 'my-hooks';

export default () => {
  const [state, setstate] = useCallbackState<number>(1);

  const handleClick = () => {
    setstate(
      i => i + 1,
      prevState => {
        // do something
        console.log(state, prevState);
      },
    );
  };

  return (
    <div>
      <p>state: {state}</p>
      <button onClick={handleClick}>add</button>
    </div>
  );
};
