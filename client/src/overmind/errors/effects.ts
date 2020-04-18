import { toaster } from 'evergreen-ui';
import type { RequestError, RequestErrorResponse } from '../../api/api';

export const toast = {
  showError(errorMsg: string) {
    toaster.danger(errorMsg, {
      duration: 30,
    });
  },

  showApiError(errorMsg: string, error: RequestError) {
    const { response } = error;

    toaster.danger(errorMsg, {
      duration: 30,
      description:
        response && process.env.NODE_ENV === 'development'
          ? formatResponse(response)
          : 'Could not connect to the API',
    });
  },
};

const formatResponse = ({ response, body }: RequestErrorResponse) =>
  `Response failed with status code ${response.status}
${body}`;
