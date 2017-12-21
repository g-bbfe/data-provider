const assert = require('assert');
const DataProvider = require('../lib');
let dataProvider = new DataProvider();
const fetch = require('node-fetch');
let { FetchError, Headers, Request, Response } = fetch;
global.fetch = fetch;
global.Request = Request;
global.Response = Response;
global.Headers = Headers;

describe('DataProvider', function() {
  describe('Interceptors', function() {
    it('Add request interceptor should be ok', function() {
      dataProvider.addRequestInterceptor(request => request);
      assert.equal(dataProvider.netWorker.interceptors.request.length, 1);
    });
    it('Add response interceptor should be ok', function() {
      dataProvider.addResponseInterceptor(response => response);
      assert.equal(dataProvider.netWorker.interceptors.response.length, 1);
    });
  });

  describe('Create Request', function() {
    it('Should have Request constructor', function() {
      let request = new Request('');
      assert.ok(true);
    });
    it('Should return a Request object', function() {
      let request = dataProvider._createRequest({ url: '' });
      assert.ok(request instanceof Request);
    });
  });

  describe('Get Response by request', function() {
    it('Should have Response constructor', function() {
      let response = new Response('');
      assert.ok(true);
    });
    it('Should get a resolved Promise in any case', function() {
      let res = dataProvider.request({ url: '' });
      res.then(
        data => {
          assert.ok(true);
        },
        err => {
          assert.ok(false);
        }
      );
    });
    it('Should return a resolved error if something wrong', function() {
      let res = dataProvider.request({ url: '' });
      res.then(
        err => {
          assert.ok(err instanceof Error);
        }
      );
    });
  });
});
