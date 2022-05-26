import { render, screen } from '@testing-library/react';
import Type from '../Type';
import { server } from '../../../mocks/server';
import { rest } from 'msw';

test('display product images from server', async () => {
  render(<Type orderType="products" />);

  const productImages = await screen.findAllByRole('img', {
    name: /product$/i,
  });
  // handlers에서 2개만 보내주므로 맞게 오는지 확인하기.
  expect(productImages).toHaveLength(2);

  const altText = productImages.map((el) => el.alt);
  expect(altText).toEqual(['America product', 'England product']);
});

test('when face an error fetching datas , display errors', async () => {
  // server를 리셋해서 정상적인 배열의 데이터 대신에 500error를 보내주도록 합니다.
  server.resetHandlers(
    rest.get('http://localhost:5000/products', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<Type orderType="products" />);

  const errorBanner = await screen.findByTestId('error-banner');
  expect(errorBanner).toHaveTextContent('에러가 발생했습니다.');
});
