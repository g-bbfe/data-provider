import { GET, POST, PUT, PATCH, DELETE } from './methods';

export default {
  error: {
    path: '/error',
    methods: [GET]
  },
  me: {
    path: '/user',
    methods: [GET]
  },
  admins: {
    path: '/admins',
    methods: [GET, POST]
  },
  admin: {
    path: '/admins/:adminId',
    methods: [GET, PATCH, PUT, DELETE]
  }
};
