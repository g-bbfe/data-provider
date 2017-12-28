import { error } from 'util';
const assert = require('assert');
const DataProvider = require('../src');
const fetch = require('node-fetch');
let { FetchError, Headers, Request, Response } = fetch;
global.fetch = fetch;
global.Request = Request;
global.Response = Response;
global.Headers = Headers;
let dataProvider;

beforeEach(function() {
  dataProvider = new DataProvider();
});

describe('DataProvider', function() {
  describe('#addRequestInterceptor()', function() {
    it('Add request interceptor should be ok', function() {
      assert.equal(dataProvider.netWorker.interceptors.request.length, 0);
      dataProvider.addRequestInterceptor(request => request);
      assert.equal(dataProvider.netWorker.interceptors.request.length, 1);
      return dataProvider.request({ url: 'http://example.com' }).then(data => {
        assert.ok(true);
      });
    });
    it('Should throw error when request interceptor has a wrong return', function() {
      dataProvider.addRequestInterceptor(request => {});
      return dataProvider.request({ url: 'http://example.com' }).then(e => {
        const messageRight =
          e.toString() ==
          'Error: Request interceptors may have a wrong return.(Expect a Request object)';
        assert.ok(e instanceof Error && messageRight);
      });
    });
  });
  describe('#addResponseInterceptor()', function() {
    it('Add response interceptor should be ok', function() {
      assert.equal(dataProvider.netWorker.interceptors.request.length, 0);
      dataProvider.addResponseInterceptor(response => response);
      assert.equal(dataProvider.netWorker.interceptors.response.length, 1);
      return dataProvider.request({ url: 'http://example.com' }).then(data => {
        assert.ok(true);
      });
    });
    it('Should throw error when response interceptor has a wrong return', function() {
      dataProvider.addResponseInterceptor(response => {});
      return dataProvider.request({ url: 'http://example.com' }).then(e => {
        const messageRight =
          e.toString() ==
          'Error: Response interceptors may have a wrong return.(Expect a Response object)';
        assert.ok(e instanceof Error && messageRight);
      });
    });
  });

  describe('#_createRequest()', function() {
    it('Should return a Request object', function() {
      let request = dataProvider._createRequest({ url: 'http://example.com' });
      assert.ok(request instanceof Request);
    });
    it('Should return itself if the option is a Request object', function() {
      let _request = new Request('http://example.com');
      let request = dataProvider._createRequest(_request);
      assert.equal(_request, request);
    });
    it("Should join the url,baseURL,query into Request's url", function() {
      let request = dataProvider._createRequest({
        url: '/404',
        baseURL: 'http://example.com',
        query: { type: 1, group: 'super' }
      });
      assert.equal(request.url, 'http://example.com/404?type=1&group=super');
    });
    it("Should join query into Request's url if query is a string", function() {
      let request = dataProvider._createRequest({
        url: 'http://example.com/404',
        query: '?type=1&group=super'
      });
      let request_sec = dataProvider._createRequest({
        url: 'http://example.com/404',
        query: 'type=1&group=super'
      });
      assert.equal(request.url, 'http://example.com/404?type=1&group=super');
      assert.equal(
        request_sec.url,
        'http://example.com/404?type=1&group=super'
      );
    });
  });

  describe('#request()', function() {
    it('Should return a resolved Promise if everything ok', function(done) {
      let res = dataProvider.request({ url: 'http://example.com' });
      res.then(
        data => {
          done();
        },
        error => {
          done(error);
        }
      );
    });
    it('Should return a resolved Promise if something wrong', function(done) {
      dataProvider.addResponseInterceptor(response => {});
      let res = dataProvider.request({ url: 'http://example.com/' });
      res
        .then(data => {
          assert.ok(data instanceof Error);
          done();
        })
        .catch(error => {
          done(error);
        });
    });
    it("Should return different Promise if there' no requestIdResolver", function() {
      let res1 = dataProvider.request({ url: 'http://example.com/' });
      let res2 = dataProvider.request({ url: 'http://example.com/' });
      assert.ok(res1 !== res2);
    });
  });
});
