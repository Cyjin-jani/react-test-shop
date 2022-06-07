import { render, screen } from '@testing-library/react';
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
});
