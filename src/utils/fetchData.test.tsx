import { fetchData } from './fetchData';
import { DRAGONS, ROCKETS } from '../constants';
import { server, rest, rocketsUrl, dragonsUrl } from '../testServer';
import { rocketsDataMock, dragonsDataMock } from '../mocks/index';

describe('fetchData', () => {
  it('receives correct Rockets data from API /rockets endpoint', async () => {
    const data = await fetchData(ROCKETS.toLowerCase());
    expect(data).toEqual(rocketsDataMock);
  });

  it('receives correct Dragons data from API /dragons endpoint', async () => {
    const data = await fetchData(DRAGONS.toLowerCase());
    expect(data).toEqual(dragonsDataMock);
  });

  it('handles Rockets request API failure', async () => {
    server.use(
      rest.get(rocketsUrl, (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    await expect(fetchData(ROCKETS.toLowerCase())).rejects.toThrow('404');
  });

  it('handles Dragons request API failure', async () => {
    server.use(
      rest.get(dragonsUrl, (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    await expect(fetchData(DRAGONS.toLowerCase())).rejects.toThrow('404');
  });
});
