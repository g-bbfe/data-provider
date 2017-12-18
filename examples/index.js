import request from './service';
import { makeUrl, render } from './utils';
import { error } from 'util';
import resource from './resources.js';

const prefix =
  'http://mock.bbfe.group/mock/5a1e89e8d3ef9a75725992d3/snc/api/v1';

const services = {
  getError() {
    const url = prefix + resource.error.path;
    let result = request(url);
    return result.then(response => response, error => error);
  },
  getMe() {
    const url = prefix + resource.me.path;
    let result = request(url);
    return result.then(response => response.json(), error => error);
  },
  async getAdmins() {
    const url = prefix + resource.admins.path;
    let response = await request(url);
    return Promise.resolve(response.json());
  },
  postAdmins(payload) {
    const url = prefix + resource.admins.path;
    let req = new Request(url, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    let result = request(req);
    return result.then(response => response.json(), error => error);
  },
  getAdmin(params) {
    const url = makeUrl(prefix + resource.admin.path, params);
    let result = request(url);
    return result.then(response => response.json(), error => error);
  },
  deleteAdmin(params) {
    const url = makeUrl(prefix + resource.admin.path, params);
    let req = new Request(url, {
      method: 'DELETE'
    });
    let result = request(req);
    return result.then(response => response, error => error);
  }
};

services.getAdmins().then(data => {
  render(data);
});

window.addEventListener('click', function() {
  services
    .getAdmin({ adminId: 1 })
    .then(data => {
      render(data);
    })
    .catch(err => {
      console.log('error!', err);
    });
});

services
  .getAdmin({ adminId: 1 })
  .then(data => {
    render(data);
  })
  .catch(err => {
    console.log('error!', err);
  });

services.deleteAdmin({ adminId: 1 }).catch(err => {
  console.log('error!', err);
});

let data = {
  name: 'string',
  cname: 'string',
  password: 'string',
  passwordType: 'default',
  type: 0,
  status: 0,
  ldapId: 0,
  dn: 'string'
};
services
  .postAdmins(data)
  .then(data => {
    render(data);
  })
  .catch(err => {
    console.log('error!', err);
  });

services
  .getError()
  .then(data => {
    render(data);
  })
  .catch(err => {
    console.log('error!', err);
  });
