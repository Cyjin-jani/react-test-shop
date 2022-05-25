import { render, screen } from '@testing-library/react';
import Type from '../Type';

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
