import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../test-util';
import Type from '../Type';
import OrderPage from '../OrderPage';

test('update products total when products quantity is changed', async () => {
  render(<Type orderType="products" />);

  // 상품 총 가격 뒤에 어떠한 text가 오더라도 가져올 수 있도록 exact 옵션을 false로 준다.
  const productsTotal = screen.getByText('상품 총 가격:', { exact: false });
  expect(productsTotal).toHaveTextContent('0');

  // america 여행 상품 개수를 1개 올린다.
  const americaInput = await screen.findByRole('spinbutton', {
    name: 'America',
  });

  userEvent.clear(americaInput);
  userEvent.type(americaInput, '1');
  expect(productsTotal).toHaveTextContent('1000');
});
test('update options total when option is changed', async () => {
  render(<Type orderType="options" />);

  const optionsTotal = screen.getByText('옵션 총 가격', { exact: false });

  expect(optionsTotal).toHaveTextContent('0');

  const insuranceCheckbox = await screen.findByRole('checkbox', {
    name: 'Insurance',
  });
  userEvent.click(insuranceCheckbox);
  expect(optionsTotal).toHaveTextContent('500');

  const dinnerCheckbox = await screen.findByRole('checkbox', {
    name: 'Dinner',
  });
  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent('1000');
});

describe('total price of products and options', () => {
  test('total price starts with 0 and updating total price when add one product', async () => {
    render(<OrderPage />);
    const total = screen.getByText('Total Price:', { exact: false });
    expect(total).toHaveTextContent('0');

    const americaInput = await screen.findByRole('spinbutton', {
      name: 'America',
    });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, '1');

    expect(total).toHaveTextContent('1000');
  });
  test('update total price when add one option', async () => {
    render(<OrderPage />);
    const total = screen.getByText('Total Price:', { exact: false });

    const insuranceCheckbox = await screen.findByRole('checkbox', {
      name: 'Insurance',
    });

    userEvent.click(insuranceCheckbox);
    expect(total).toHaveTextContent('500');
  });
  test('update total price when remove option and product', async () => {
    render(<OrderPage />);
    const total = screen.getByText('Total Price:', { exact: false });

    const insuranceCheckbox = await screen.findByRole('checkbox', {
      name: 'Insurance',
    });
    userEvent.click(insuranceCheckbox);

    const americaInput = await screen.findByRole('spinbutton', {
      name: 'America',
    });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, '3');

    userEvent.clear(americaInput);
    userEvent.type(americaInput, '1');

    expect(total).toHaveTextContent('1500');
  });
});
