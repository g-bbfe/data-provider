import pathToRegexp from 'path-to-regexp';
import request from './service';
import { render } from './utils';
import resource from './resources.js';

const urlCompiler = (path, params) => {
  let url = pathToRegexp.compile(path)(params);
  return url;
};

const services = {
  async getError() {
    let url = urlCompiler(resource.error.path);
    let data = await request(url, 'GET');
    return data;
  },
  async getMe({ params }) {
    let url = urlCompiler(resource.me.path, params);
    let data = await request(url, 'GET');
    return data;
  },
  async getAdmins() {
    let url = urlCompiler(resource.admins.path);
    let data = await request(url, 'GET');
    return data;
  },
  async postAdmins({ body, query }) {
    let url = urlCompiler(resource.admins.path);
    let data = await request(url, 'POST', body, query);
    return data;
  },
  async getAdmin({ params }) {
    let url = urlCompiler(resource.admin.path, params);
    let data = await request(url, 'GET');
    return data;
  },
  async deleteAdmin({ params }) {
    let url = urlCompiler(resource.admin.path, params);
    let data = await request(url, 'DELETE');
    return data;
  }
};

services.getAdmins().then(data => {
  if (data instanceof Error) {
    render(data.toString());
  } else {
    render(data);
  }
});

window.addEventListener('click', function() {
  services
    .getAdmin({ params: { adminId: 1 } })
    .then(data => {
      if (data instanceof Error) {
        render(data.toString());
      } else {
        render(data);
      }
    })
    .catch(err => {
      console.log('error!', err);
    });
});

services
  .getAdmin({ params: { adminId: 1 } })
  .then(data => {
    if (data instanceof Error) {
      render(data.toString());
    } else {
      render(data);
    }
  })
  .catch(err => {
    console.log('error!', err);
  });

services
  .deleteAdmin({ params: { adminId: 1 } })
  .then(data => {
    if (data instanceof Error) {
      render(data.toString());
    } else {
      document.body.style.background = '#ddd';
    }
  })
  .catch(err => {
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
  .postAdmins({ body: data, query: {group: '1', type: 'super'} })
  .then(data => {
    if (data instanceof Error) {
      render(data.toString());
    } else {
      render(data);
    }
  })
  .catch(err => {
    console.log('error!', err);
  });

services
  .getError()
  .then(data => {
    if (data instanceof Error) {
      document.body.style.color = 'red';
      render(data.toString());
    } else {
      console.log('not error');
      render(data);
    }
  })
  .catch(err => {
    console.log('error!', err);
  });
