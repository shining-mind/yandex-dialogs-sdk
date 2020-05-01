import { Alice, render, sessionMiddleware } from '../src/index';
import { InMemorySessionStorage } from '../src/session/inMemorySessionStorage';
import { createTextRequest } from './utils/request';
import { generateRandomText } from './utils/text';

const { reply } = render;

describe('alice module', () => {
  let alice: Alice;
  let randomText: string = '';
  beforeEach(() => {
    alice = new Alice();
    alice.use(sessionMiddleware(new InMemorySessionStorage()));
    randomText = generateRandomText();
  });

  test('listening on port & stop listening', async done => {
    const server = alice.listen(8123, '/');
    setTimeout(() => {
      server.stop();
      done();
    }, 0);
  });

  test('any command', async () => {
    alice.any(ctx => reply`${randomText}`);
    const data = await alice.handleRequest(createTextRequest('ping'));
    expect(data.response.text).toBe(randomText);
  });

  test('text command', async () => {
    alice.command('foo bar', ctx => reply`${randomText}`);
    const data = await alice.handleRequest(createTextRequest('foo bar'));
    expect(data.response.text).toBe(randomText);
  });

  test('regex command', async () => {
    alice.command(/foo/, ctx => reply`${randomText}`);
    const data = await alice.handleRequest(createTextRequest('foo bar'));
    expect(data.response.text).toBe(randomText);
  });

  test('text array command', async () => {
    alice.command(['foo', 'foo bar'], ctx => reply`${randomText}`);
    const data = await alice.handleRequest(createTextRequest('foo bar'));
    expect(data.response.text).toBe(randomText);
  });

  test('matcher command', async () => {
    alice.command(ctx => true, ctx => reply`${randomText}`);
    const data = await alice.handleRequest(createTextRequest('foo bar'));
    expect(data.response.text).toBe(randomText);
  });
});
