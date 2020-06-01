const { insertUserInDB } = require('../../src/services/user');

jest.mock('../../src/models/users', () => () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  return dbMock.define('user', {});
});

describe('Users Table', () => {
  const user1 = {
    name: 'Dhanalakshmi',
    user_name: 'Dhana',
    password: 'dhana123',
    email: 'dhanalakshmi.narala@gmail.com',
    address: 'brahmapuri',
    is_admin: false,
  };

  const user2 = {
    name: 'Sailaja',
    user_name: 'sailu',
    password: 'sailu12345',
    email: 'sailu@gmail.com',
    address: 'amalapuram',
    is_admin: true,
  };

  describe('insertUserInDB', () => {
    it('should insert user1', async () => {
      const userRecord = await insertUserInDB(user1);
      compareUserInfo(userRecord.dataValues, user1);
    });

    it('shoud insert user2', async () => {
      const userRecord = await insertUserInDB(user2);
      compareUserInfo(userRecord.dataValues, user2);
    });
  });

  const compareUserInfo = (user, expectUser) => {
    expect(user.id).toBeDefined();
    expect(user.name).toBe(expectUser.name);
    expect(user.user_name).toBe(expectUser.user_name);
    expect(user.password).toBeDefined();
    expect(user.email).toBe(expectUser.email);
    expect(user.address).toBe(expectUser.address);
    expect(user.is_admin).toBe(expectUser.is_admin);
  };
});
