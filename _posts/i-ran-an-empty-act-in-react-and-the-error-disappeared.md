---
title: "reactで空のactを実行したらErrorが消えた"
excerpt: "みなさんこんにちは、かじりです。reactでjestのtest中に発生したエラーを解決する方法を共有します。"
created_at: "2020-11-28 20:23:13"
updated_at: "2020-12-31 21:57:22"
tags: [react, jest]
---

みなさんこんにちは、かじりです。reactでjestのtest中に発生したエラーを解決する方法を共有します。

await act(async()=>{})を書いたら、Errorが消えた

書けとErrorに書いてあるが、空のcallbackでいいとは思わなかッタ

## Error

```bash
  console.error
    Warning: An update to TestHook inside a test was not wrapped in act(...).

    When testing, code that causes React state updates should be wrapped into act(...):

    act(() => {
      /* fire events that update state */
    });
    /* assert on the output */

    This ensures that you're testing the behavior the user would see in the browser. Learn more at https://fb.me/react-wrap-tests-with-act
        in TestHook
        in Suspense

      13 |         const apps: AppTypes[] = await getApps();
      14 |         setApps(apps);
    > 15 |         setSessionStatus(true);
         |         ^
      16 |       } catch (error) {
      17 |         setApps([])
      18 |         setSessionStatus(false);

      at printWarning (node_modules/react-test-renderer/cjs/react-test-renderer.development.js:120:30)
      at error (node_modules/react-test-renderer/cjs/react-test-renderer.development.js:92:5)
      at warnIfNotCurrentlyActingUpdatesInDEV (node_modules/react-test-renderer/cjs/react-test-renderer.development.js:13729:7)
      at dispatchAction (node_modules/react-test-renderer/cjs/react-test-renderer.development.js:6405:9)
      at src/scripts/useState/useApps.ts:15:9
      at step (src/scripts/useState/useApps.ts:33:23)
      at Object.next (src/scripts/useState/useApps.ts:14:53)
```

## 解決

```javascript
import {useApps} from '../useApps'
import {renderHook, act} from '@testing-library/react-hooks'
import { getApps } from "../../api/getApps";
jest.mock('../../api/getApps')

test("", async()=>{
  (getApps as jest.Mock).mockReturnValueOnce(Promise.reject())
  const {result, rerender} = renderHook(()=>useApps())
  await act(async()=>{}) // ← add this line
  expect(result.current).toEqual([[], false])
})
test("", async()=>{
  (getApps as jest.Mock).mockReturnValueOnce(Promise.resolve([]))
  const {result} = renderHook(()=>useApps())
  await act(async()=>{}) // ← add this line
  expect(result.current).toEqual([[], true])
})
```
