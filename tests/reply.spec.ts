import { Reply } from '../src/reply/reply';
import { Markup } from '../src/reply/markup';
import { generateRandomText } from './utils/text';

const M = Markup;
describe('Alice Reply (static method) suite', () => {
  let text = '';

  beforeEach(() => {
    text = generateRandomText();
  });

  test('Text reply', () => {
    expect(Reply.text(text)).toEqual({
      text: text,
      tts: text,
      end_session: false,
    });
  });

  test('Text reply with extra params', () => {
    const expected = {
      text: text,
      tts: `${text}+`,
      end_session: true,
      buttons: [M.button('one'), M.button('two'), M.button('three')],
    };
    expect(
      Reply.text(expected.text, {
        tts: expected.tts,
        end_session: true,
        buttons: ['one', 'two', 'three'],
      }),
    ).toEqual(expected);
  });

  test('BigImage Card reply', () => {
    const expected = {
      text: 'text',
      tts: 'text',
      card: {
        type: 'BigImage',
        image_id: '1',
        title: 'title',
        description: 'description',
      },
      end_session: false,
    };
    const reply = Reply.bigImageCard(expected.text, {
      image_id: expected.card.image_id,
      title: expected.card.title,
      description: expected.card.description,
    });
    expect(reply).toEqual(expected);
  });

  test('ItemsList Card reply with array', () => {
    const expected = {
      text: 'text',
      tts: 'text',
      card: {
        type: 'ItemsList',
        items: [
          {
            image_id: '1',
            title: 'title',
            description: 'description',
          },
          {
            image_id: '1',
            title: 'title',
            description: 'description',
          },
        ],
      },
      end_session: false,
    };
    const reply = Reply.itemsListCard(expected.text, expected.card.items);
    expect(reply).toEqual(expected);
    const reply2 = Reply.itemsListCard(expected.text, expected.card);
    expect(reply2).toEqual(expected);
  });
});

describe('Markup suite', () => {
  test('Markup button with text constructor', () => {
    const expected = {
      title: 'foo',
    };
    const button = Markup.button(expected.title);
    expect(button).toEqual(expected);
  });

  test('Markup button with object constructor', () => {
    const expected = {
      title: 'foo',
      hide: true,
      url: '',
      payload: {
        title: 'foo',
      },
    };
    const button = Markup.button(expected);
    expect(button).toEqual(expected);
  });
});
