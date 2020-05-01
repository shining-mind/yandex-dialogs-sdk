declare module 'alice-renderer' {
  import { ApiResponseBody, ApiResponseBodyButton, ApiResponseBigImageCard } from 'yandex-dialogs-sdk/api/response';

  export function reply(stringParts: TemplateStringsArray, ...values: any[]): ApiResponseBody;
  export function buttons(
    items: Array<string | ApiResponseBodyButton>,
    defaults?: ApiResponseBodyButton,
  ): ApiResponseBodyButton[];
  export function audio(name: string): void;
  export function effect(name: string): void;
  export function pause(ms?: number): void;
  export function br(count?: number): void;
  export function text(value: string | string[]): void;
  export function tts(value: string | string[]): void;
  export function textTts(
    textValue: string | string[],
    ttsValue: string | string[],
  ): void;
  export function plural(
    number: number,
    one: string,
    two: string,
    five: string,
  ): void;
  export function enumerate(list: any[]): void;

  export function userify(userId: string, target: typeof reply): typeof reply;
  export function userify(
    userId: string,
    target: { [key: string]: typeof reply },
  ): { [key: string]: typeof reply };

  export function select(array: string[]): string;

  export function once(
    options: {
      calls?: number;
      seconds?: number;
      leading: boolean;
    },
    response: any,
  ): void;

  export function configure(options: { disableRandom?: boolean }): void;

  export function image(
    imageId: string,
    options?: {
      title?: string;
      description?: string;
      appendDescription?: string;
      button?: ApiResponseBodyButton;
    },
  ): ApiResponseBigImageCard
}
