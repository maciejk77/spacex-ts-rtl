import 'whatwg-fetch'; // not needed for CRA, polyfill for fetch
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BASE_URL, DRAGONS, ROCKETS } from './constants';
import { rocketsDataMock, dragonsDataMock } from '../src/mocks';

const getUrl = (type: string) => `${BASE_URL}/${type.toLowerCase()}`;
const rocketsUrl = getUrl(ROCKETS);
const dragonsUrl = getUrl(DRAGONS);

const server = setupServer(
  rest.get(rocketsUrl, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(rocketsDataMock));
  }),
  rest.get(dragonsUrl, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(dragonsDataMock));
  }),
  rest.get('*', (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`);
    return res(
      ctx.status(500),
      ctx.json({ error: 'Please add request handler' })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest, rocketsUrl, dragonsUrl };
