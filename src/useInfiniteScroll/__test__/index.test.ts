import { renderHook } from '@testing-library/react-hooks';
import useInfiniteScroll from '../index';

describe('useInfiniteScroll', () => {
  it('should be defined', () => {
    expect(useInfiniteScroll).toBeDefined();
  });
});
