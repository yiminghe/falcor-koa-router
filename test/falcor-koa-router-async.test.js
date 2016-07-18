import chai from 'chai';
import request from 'supertest';
import Koa from 'koa';
import mount from 'koa-mount';
import FalcorRouter from 'falcor-router';
import router from '../src';

const should = chai.should;

describe('dataSourceRoute with async/await', () => {

  const app = new Koa();

  app.on('error', err =>
    console.error('server error', err)
  );

  app.use(mount('/', router.routes([
      {
        route: 'test',
        get: async (paths) => {
          let value = await testAsyncGetFunction('Hello Test');
          return {
            path: ['test'],
            value: value
          };
        },
        set: async (jsonGraph) => {
          let text = jsonGraph.test;
          let value = await testAsyncSetFunction(text);
          return {
            path: ['test'],
            value: value
          }
        }
      }
    ])
  ));

  async function testAsyncGetFunction(text) {
    return await timeoutTest(text);
  }

  async function testAsyncSetFunction(text) {
    return await timeoutTest(text);
  }

  function timeoutTest(text) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(text);
      }, 500);
    });
  }

  it('should return the JSON Graph for async get function', done => {
    request(app.listen())
      .get('/todo?paths=[[%22test%22]]&method=get')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        "jsonGraph": {
          "test": "Hello Test"
        }
      })
      .end(done);
  });

  it('should return the JSON Graph for async set function', done => {
    request(app.listen())
      .post('/todo')
      .type('form')
      .send({
        jsonGraph: '{"jsonGraph":{"test":"testSet"},"paths":[["test"]]}',
        method: 'set'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        "jsonGraph": {
          "test": "testSet"
        }
      })
      .end(done);
  });
});
