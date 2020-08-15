import { rest } from 'msw';

const apiUrl = process.env.REACT_APP_API_URL;

export const handlers = [
  rest.get(`${apiUrl}/greeting`, (req, res, ctx) => {
    return res(ctx.json({ message: 'hello world' }));
  }),
  rest.post(`${apiUrl}/trips`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(req.body));
  }),
];
