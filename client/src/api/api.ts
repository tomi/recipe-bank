import { EitherAsync } from 'purify-ts/EitherAsync';
import { Left } from 'purify-ts/Either';

export interface RequestErrorResponse {
  response: Response;
  body: string;
}

export class RequestError extends Error {
  constructor(public readonly response?: RequestErrorResponse) {
    super('Request failed');
  }
}

/**
 * Does an HTTP request to the given URL with given params.
 * Return an `Either` with the response body in `Right` if the
 * request succeeded or an error in `Left`.
 *
 * @param url
 * @param init
 */
export const fetch = <TResponse>(url: string, init?: RequestInit) =>
  EitherAsync<RequestError, TResponse>(async ({ liftEither }) => {
    const response = await window.fetch(url, init);

    if (!response.ok) {
      const body = await response.text();
      return liftEither(Left(new RequestError({ response, body })));
    }

    const data = await response.json();

    return data as TResponse;
  });
