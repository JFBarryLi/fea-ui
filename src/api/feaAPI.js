import { client } from 'api/client';

export async function getTrussResult(body) {
  const url = process.env.REACT_APP_FEA_API_DOMAIN + '/truss';
  const response = await client.post(url, body);
  return response;
}
