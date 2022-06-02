import { render } from '@testing-library/react';
import { OrderContextProvider } from './contexts/OrderContext';

// ui: 렌더하고자 하는 jsx
// options: wrapper옵션 이외에 우리가 주고자 하는 다른 옵션들
const customRender = (ui, options) =>
  render(ui, { wrapper: OrderContextProvider, ...options });

// render메소드 이외에도 해당 라이브러리에서 제공하는 모든 것을 다시 export해준다.
export * from '@testing-library/react';
// 원래 라이브러리에서 제공하는 render메소드를 customRender로 override해준다.
export { customRender as render };
