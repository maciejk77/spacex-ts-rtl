import { BASE_URL } from '../constants';

export const fetchData = async (name: string) => {
  const result = await fetch(`${BASE_URL}/${name}`);
  if (!result.ok) {
    throw new Error(`Request failed with status code 404`);
  }
  return await result.json();
};
