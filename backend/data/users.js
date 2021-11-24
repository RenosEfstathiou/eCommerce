import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'Renos Ef',
    email: 'renose@example.com',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'John Ef',
    email: 'johne@example.com',
    password: bcrypt.hashSync('123456', 10)
  }
];

export default users;
