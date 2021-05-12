import { act, renderHook } from '@testing-library/react-hooks';
import useCallbackState from '../index';

describe('useCallbackState', () => {
  it('should be defined', () => {
    expect(useCallbackState).toBeDefined();
  });

  const setUp = <T>(initialValue: T) =>
    renderHook(() => {
      const [state, setState] = useCallbackState<T>(initialValue);
      return {
        state,
        setState,
      } as const;
    });

  it('should support initialValue', () => {
    const hook = setUp({
      hello: 'world',
    });
    expect(hook.result.current.state).toEqual({ hello: 'world' });
  });

  it('should support callback', () => {
    const hook = setUp<any>({
      hello: 'world',
    });
    let state = {};
    act(() => {
      hook.result.current.setState({ foo: 'bar' }, prevState => {
        state = prevState;
      });
    });
    expect(state).toEqual({ foo: 'bar' });
  });

  it('should support function update', () => {
    const hook = setUp({
      count: 0,
    });
    act(() => {
      hook.result.current.setState(prev => ({ count: prev.count + 1 }));
    });
    expect(hook.result.current.state).toEqual({ count: 1 });
  });
});
