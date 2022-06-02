import { render, screen } from '../../../test-util';
import Type from '../Type';
import { server } from '../../../mocks/server';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import { OrderContextProvider } from '../../../contexts/OrderContext';

test('update products total when products quantity is changed', async () => {
  render(<Type orderType="products" />);

  // 상품 총 가격 뒤에 어떠한 text가 오더라도 가져올 수 있도록 exact 옵션을 false로 준다.
  const productsTotal = screen.getByText('총 가격:', { exact: false });
  expect(productsTotal).toHaveTextContent('0');

  // america 여행 상품 개수를 1개 올린다.
  const americaInput = await screen.findByRole('spinbutton', {
    name: 'America',
  });

  userEvent.clear(americaInput);
  userEvent.type(americaInput, '1');
  expect(productsTotal).toHaveTextContent('1000');
});
