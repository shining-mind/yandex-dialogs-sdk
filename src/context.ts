import { ApiRequest } from 'yandex-dialogs-sdk/api/request';
import { ApiRequestNlu } from 'yandex-dialogs-sdk/api/nlu';
import { ApiResponseBody } from 'yandex-dialogs-sdk/api/response';

export interface Context {
  readonly data: ApiRequest;
  readonly message: string;
  readonly originalUtterance: string;
  readonly sessionId: string;
  readonly messageId: number;
  readonly userId: string;
  readonly payload?: object;
  readonly nlu?: ApiRequestNlu;
  // param response appears in context when all
  // middlewares have been done and we got some response
  response?: ApiResponseBody;
}
