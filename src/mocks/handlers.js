import { rest } from 'msw';

export const handlers = [
  // products
  rest.get('http://localhost:5000/products', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: 'America',
          imagePath: '/images/america.jpg',
        },
        {
          name: 'England',
          imagePath: '/images/england.jpg',
        },
      ])
    );
  }),
  // options
  rest.get('http://localhost:5000/options', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: 'Insurance',
        },
        {
          name: 'Dinner',
        },
      ])
    );
  }),

  // orderComplete
  rest.post('http://localhost:5000/order', (req, res, ctx) => {
    let dummyData = [{ orderNumber: 123123, price: 2000 }];
    return res(ctx.json(dummyData));
  }),
];
