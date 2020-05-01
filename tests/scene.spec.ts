import { Alice, Scene, Stage, render, StageContext, sessionMiddleware } from '../src/index';
import { InMemorySessionStorage } from '../src/session/inMemorySessionStorage';
import { createTextRequest } from './utils/request';
import { generateRandomText } from './utils/text';

const { reply } = render;

describe('alice scenes', () => {
  let alice: Alice;
  let stage: Stage;
  let randomText = '';
  beforeEach(() => {
    alice = new Alice();
    alice.use(sessionMiddleware(new InMemorySessionStorage()));
    stage = new Stage();
    randomText = generateRandomText();
  });

  test('create new scene', async done => {
    const scene = new Scene('bar');
    scene.any(ctx => reply`${randomText}`);
    stage.addScene(scene);
    alice.use(stage.getMiddleware());
    alice.any(async (ctx: StageContext) => {
      ctx.enter('bar');
      return reply`foo`;
    });
    // handling first request, leading to the scene "bar"
    let data = await alice.handleRequest(createTextRequest('hey!'));
    expect(data.response.text).toBe('foo');
    // now looking for an answer from scene
    data = await alice.handleRequest(createTextRequest('hey!'));
    expect(data.response.text).toBe(randomText);
    done();
  });

  test('switch between scenes', async done => {
    const scene1 = new Scene('1');
    scene1.any((ctx: StageContext) => {
      ctx.enter('2');
      return reply`scene1`;
    });
    const scene2 = new Scene('2');
    scene2.any(async (ctx: StageContext) => {
      ctx.leave();
      return reply`scene2`;
    });
    stage.addScene(scene1);
    stage.addScene(scene2);
    alice.use(stage.getMiddleware());
    alice.any(async (ctx: StageContext) => {
      ctx.enter('1');
      return reply`alice`;
    });
    let data = await alice.handleRequest(createTextRequest('baz'));
    expect(data.response.text).toBe('alice');
    done();
    data = await alice.handleRequest(createTextRequest('.'));
    expect(data.response.text).toBe('scene1');
    data = await alice.handleRequest(createTextRequest('.'));
    expect(data.response.text).toBe('scene2');
    data = await alice.handleRequest(createTextRequest('.'));
    expect(data.response.text).toBe('alice');
  });
});
