// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { server } from './mocks/server';

// test실행 전 서버를 켬
beforeAll(() => server.listen());

// 각 테스트 끝나면 서버의 핸들러 리셋
afterEach(() => server.resetHandlers());

// test가 모두 끝나면 서버를 꺼준다.
afterAll(() => server.close());
