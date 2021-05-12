---
title: useInfiniteScroll
nav:
  title: Hooks
  path: /hooks
group:
  title: UI
  path: /use-infinite-scroll
---

# useInfiniteScroll

提供无限滚动加载列表能力的 Hook，让你专注于 ui 层面，其他的交给 useInfiniteScroll

### 基础用法

<code src="./demo/demo1.tsx" />

### 下拉滚动

<code src="./demo/demo2.tsx" />

### 回到离开前的滚动位置

<code src="./demo/demo3.tsx" />

## API

```typescript
interface Options {
  direction: 'up' | 'down';
  root?: HTMLElement;
}

interface Result {
  wrapperProps: {
    ref: (ele: any) => void,
  };
  loadingProps: {
    ref: (ele: any) => void,
  };
  disconnect: () => void;
}

useInfiniteScroll(
  onEndReached: () => any,
  options?: Options
): Result
```

### Params

| 参数         | 说明                          | 类型        | 默认值 |
| ------------ | ----------------------------- | ----------- | ------ |
| onEndReached | 列表被滚动到最底部\顶部时调用 | `() => any` | -      |
| options      | 选填，配置项                  | `Options`   | -      |

### Options

| 参数      | 说明                                          | 类型               | 默认值 |
| --------- | --------------------------------------------- | ------------------ | ------ |
| direction | 滚动方向                                      | `'up'` \| `'down'` | `up`   |
| root      | 选填，滚动容器的 dom 节点，如使用 body 滚动时 | `HTMLElement`      | -      |

### Result

| 参数         | 说明             | 类型                    |
| ------------ | ---------------- | ----------------------- |
| wrapperProps | 滚动容器的 props | `object`                |
| loadingProps | loading 的 props | `object`                |
| disconnect   | 关闭滚动监听     | `() => void`            |
| getScrollTop | 获取滚动距离     | `() => number`          |
| setScrollTop | 设置滚动距离     | `(top: number) => void` |
