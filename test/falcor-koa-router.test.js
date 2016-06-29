import chai from 'chai';
import request from 'supertest';
import Koa from 'koa';
import mount from 'koa-mount';
import FalcorRouter from 'falcor-router';
import router from '../lib';

const should = chai.should;

describe('dataSourceRoute', () => {

  const app = new Koa();

  app.on('error', err =>
    console.error('server error', err)
  );

  app.use(mount('/', router.routes([
      {
        route: 'test',
        get: (paths) => {
          return new Promise((resolve, reject) => {
            return resolve({
              path: ['test'],
              value: 'Hello Test'
            });
          });
        },
        set: (jsonGraph) => {
          return {
            path: ['test'],
            value: jsonGraph.test
          }
        }
      }
    ])
  ));

  it('should return the JSON Graph', done => {
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

  it('should throw error for request not supported', done => {
    request(app.listen())
      .get('/todo')
      .expect(500, 'Request not supported')
      .end(done);
  });

  it('should throw error for no query method provided', done => {
    request(app.listen())
      .get('/todo?method=')
      .expect(500, 'No query method provided')
      .end(done);
  });

  it('should throw error for data source does not implement method test', done => {
    request(app.listen())
      .get('/todo?method=test')
      .expect(500, 'Data source does not implement method test')
      .end(done);
  });
});
