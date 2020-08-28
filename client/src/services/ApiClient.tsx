const serverApiUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL;

type clientOptions<T> = {
  apiBaseUrl?: string;
  data?: T;
  accessToken?: string;
  queryParams?: QueryParams;
};

export function client<T, P = T>(
  endpoint: string,
  {
    apiBaseUrl = serverApiUrl,
    data,
    accessToken,
    queryParams = {},
    ...options
  }: clientOptions<T> & RequestInit = {}
): Promise<P> {
  const headers = new Headers();
  if (data) headers.append('Content-Type', 'application/json');
  if (accessToken) headers.append('Authorization', `Bearer ${accessToken}`);

  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers,
    ...options,
  };

  const queryString = queryParamsToString(queryParams);

  const request = new Request(
    encodeURI(`${apiBaseUrl}/${endpoint}${queryString}`),
    config
  );

  return window.fetch(request).then(async (response) => {
    try {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  });
}

export type QueryParams = {
  [key: string]: string;
};

const queryParamsToString: (queryParams: QueryParams) => string = (
  queryParams
) => {
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return queryString ? `?${queryString}` : '';
};
