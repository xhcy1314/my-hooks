import { useEffect, useRef, useState, SetStateAction } from 'react';
import { useUnmount } from 'ahooks';

export type Dispatch<A, B> = (value: A, callback?: B) => void;

function useCallbackState<T>(
  initialState: T | (() => T),
): [T, Dispatch<SetStateAction<T>, (prevState: T) => any>] {
  const [state, setstate] = useState<T>(initialState);
  const cb = useRef<((prevState: T) => void) | null>(() => {});
  const unmount = useRef<boolean>(false);

  useEffect(() => {
    if (!cb.current) return () => {};

    if (typeof cb.current === 'function') {
      cb.current(state);
      cb.current = null;
    } else {
      throw new TypeError(cb.current + ' must be a function');
    }
  }, [state]);

  useUnmount(() => (unmount.current = true));

  return [
    state,
    (action, callback) => {
      if (unmount.current) return;
      cb.current = callback ? callback : null;
      setstate(action);
    },
  ];
}

export default useCallbackState;
