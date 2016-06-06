import chai from 'chai';
import request from 'supertest';
import Koa from 'koa';
import mount from 'koa-mount';
import FalcorRouter from 'falcor-router';
import router from '../index';
import falcor from 'falcor';
import HttpDataSource from 'falcor-http-datasource';

const expect = chai.expect;

describe('falcorModel', () => {

  const app = new Koa();

  app.on('error', err =>
    console.error('server error', err)
  );

  app.use(mount('/demo', router.routes([
      {
        route: 'test',
        get: () => {
          return {
            path: ['test'],
            value: 'Hello Test'
          }
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

  app.listen(4000)

  it('should return response from model.get', done => {
    var test = new falcor.Model({
      source: new HttpDataSource('http://localhost:4000/demo')
    });

    test.get([['test']])
      .then((response) => {
        expect(response).to.be.defined;
        expect(response.json).to.have.ownProperty('test');
        expect(response.json.test).to.equal('Hello Test');
        done();
      });
  });

  it('should return response from model.set', done => {
    var test = new falcor.Model({
      source: new HttpDataSource('http://localhost:4000/demo')
    });

    test.set({
      paths: [['test']],
      jsonGraph: {
        'test': 'testSet'
      }
    })
    .then((response) => {
      expect(response).to.be.defined;
      expect(response.json).to.have.ownProperty('test');
      expect(response.json.test).to.equal('testSet');
      done();
    });
  });

});