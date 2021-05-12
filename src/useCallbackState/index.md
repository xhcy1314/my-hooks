---
title: useCallbackState
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /callback-state
---

# useCallbackState

一个模拟 class setState 的 hook。并且在组件卸载后异步回调内的 setState 不再执行，避免因组件卸载后更新状态而导致的内存泄漏

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const [setate, setState] = useCallbackState<T>(
  initialState: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>, (prevState: T) => any>]
```
