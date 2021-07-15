import { fetchData } from './fetchData';
import { DRAGONS, ROCKETS } from '../constants';
// import { server, rest, rocketsUrl } from '../testServer';
import { rocketsDataMock, dragonsDataMock } from '../mocks/index';

it('receives correct Rockets data from API /rockets endpoint', async () => {
  const data = await fetchData(ROCKETS.toLowerCase());
  expect(data).toEqual(rocketsDataMock);
});

it('receives correct Dragons data from API /dragons endpoint', async () => {
  const data = await fetchData(DRAGONS.toLowerCase());
  expect(data).toEqual(dragonsDataMock);
});

// it('handles failure', async () => {
//   server.use(
//     rest.get(rocketsUrl, (req, res, ctx) => {
//       return res(ctx.status(404));
//     })
//   );
//   await expect(fetchData('dummy')).rejects.toThrow('404');
// });
