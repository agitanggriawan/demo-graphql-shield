const users = [
  {
    id: '1',
    token: 'token-for-maurice-moss',
    firstName: 'Maurice',
    lastName: 'Moss',
    email: 'maurice@moss.com',
    password: 'abcdefg',
    roles: ['ADMIN'],
  },
  {
    id: '2',
    token: 'token-for-roy-trenneman',
    firstName: 'Roy',
    lastName: 'Trenneman',
    email: 'roy@trenneman.com',
    password: 'imroy',
    roles: ['USER', 'ADMIN'],
  },
  {
    id: '3',
    token: 'token-for-jen-barber',
    firstName: 'Jen',
    lastName: 'Barber',
    email: 'jen@barber.com',
    password: 'qwerty',
    roles: ['USER'],
  },
];

module.exports = {
  getUserByToken: (token) => users.find((user) => user.token === token),
};
