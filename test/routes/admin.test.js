const request = require('supertest');
const app = require('../../src/server');

const { truncateTable } = require('./helper');

describe('/admin/uploadData', () => {
  const users = [
    {
      name: 'Dhanalakshmi',
      username: 'dhana',
      password: 'dhana123',
      confirm_password: 'dhana123',
      email: 'dhanalakshmi.narala@gmail.com',
      address: 'brahmapuri',
      is_admin: true,
    },
    {
      name: 'Sailaja',
      username: 'sailu',
      password: 'sailu123',
      confirm_password: 'sailu123',
      email: 'sailu@gmail.com',
      address: 'amalapuram',
      is_admin: false,
    },
  ];

  beforeEach(() => {
    truncateTable('users');
    truncateTable('covid_info');
  });

  it('should upload files by admin user1', async () => {
    const signUpResponse = await request(app.listen())
      .post('/signUp')
      .send(users[0]);

    expect(signUpResponse.status).toBe(200);
    expect(signUpResponse.body).toEqual({
      status: 'Success',
      message: 'User successfully signed up',
    });

    const loginResponse = await request(app).post('/auth/login').send({
      username: users[0].username,
      password: users[0].password,
    });

    // expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toBeDefined();
    expect(loginResponse.body.status).toBe('Success');
    expect(loginResponse.body.message).toBe('Successfully logged in');
    expect(loginResponse.body.results.accessToken).toBeDefined();
    expect(loginResponse.body.results.refreshToken).toBeDefined();

    const user1AccessToken = loginResponse.body.results.accessToken;

    const uploadResponse = await request(app)
      .post('/admin/uploadData')
      .set('Authorization', `Bearer ${user1AccessToken}`)
      .attach(
        'covidFiles',
        './test/data/time_series_covid19_confirmed_global.csv'
      )
      .attach('covidFiles', './test/data/time_series_covid19_deaths_global.csv')
      .attach(
        'covidFiles',
        './test/data/time_series_covid19_recovered_global.csv'
      );

    expect(uploadResponse.status).toBe(200);
  }, 100000);
});
