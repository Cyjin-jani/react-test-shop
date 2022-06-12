import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders learn react link', () => {
  // render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
  // lint 설정 잘 되었는지 테스트
  // const lintTest = screen.getByRole('button', { name: 'lintTest' });
  // expect(lintTest).toHaveTextContent('lintTest');
});

test('From order to order complete page', async () => {
  // 이미 App.js에서 context를 감싸주고 있기 때문에
  // CustomRender 메서드가 아닌 기본 라이브러리 내장 render 메서드를 사용.
  render(<App />);

  const americaInput = await screen.findByRole('spinbutton', {
    name: 'America',
  });

  userEvent.clear(americaInput);
  userEvent.type(americaInput, '2');

  const englandInput = await screen.findByRole('spinbutton', {
    name: 'England',
  });

  userEvent.clear(englandInput);
  userEvent.type(englandInput, '3');

  const insuranceCheckbox = await screen.findByRole('checkbox', {
    name: 'Insurance',
  });

  userEvent.click(insuranceCheckbox);

  const orderBtn = screen.getByRole('button', { name: '주문하기' });
  userEvent.click(orderBtn);

  // 주문 확인 페이지 [start]
  const summaryHeading = screen.getByRole('heading', { name: '주문 확인' });
  expect(summaryHeading).toBeInTheDocument();

  const productsHeading = screen.getByRole('heading', {
    name: '여행 상품: 5000',
  });
  expect(productsHeading).toBeInTheDocument();

  const optionsHeading = screen.getByRole('heading', { name: '옵션: 500' });
  expect(optionsHeading).toBeInTheDocument();

  expect(screen.getByText('2 America')).toBeInTheDocument();
  expect(screen.getByText('3 England')).toBeInTheDocument();
  expect(screen.getByText('Insurance')).toBeInTheDocument();

  const confirmCheckbox = screen.getByRole('checkbox', {
    name: '주문내역을 확인하셨나요?',
  });
  userEvent.click(confirmCheckbox);

  const confirmOrderBtn = screen.getByRole('button', { name: '주문 확인' });
  userEvent.click(confirmOrderBtn);

  // 주문 확인 페이지 [end]

  // 주문 완료 페이지 [start]

  // 대소문자 관계없이 loading이란 글자가 있으면 가져옴.
  const loadingEl = screen.getByText(/loading/i);
  expect(loadingEl).toBeInTheDocument();

  const completeHeader = await screen.findByRole('heading', {
    name: '주문이 성공했습니다.',
  });
  expect(completeHeader).toBeInTheDocument();

  const loadingDisappeared = screen.queryByText('loading');
  expect(loadingDisappeared).not.toBeInTheDocument();

  const firstPageBtn = screen.getByRole('button', {
    name: '첫 페이지로',
  });
  userEvent.click(firstPageBtn);

  // await waitFor(() => {
  //   screen.getByRole('spinbutton', { name: 'America' });
  // });
  // 위 waitFor을 쓴 것과 동일한 결과.
  await screen.findByRole('spinbutton', { name: 'America' });

  // 주문 완료 페이지 [end]
});
