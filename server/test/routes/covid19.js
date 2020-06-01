const request = require("supertest");
const app = require("../../src/server");

const { truncateTable } = require("./helper");

describe("/covid19", () => {
  const users = [
    {
      name: "Dhanalakshmi",
      username: "dhana",
      password: "dhana123",
      confirm_password: "dhana123",
      email: "dhanalakshmi.narala@gmail.com",
      address: "brahmapuri",
      is_admin: true,
    },
    {
      name: "Sailaja",
      username: "sailu",
      password: "sailu123",
      confirm_password: "sailu123",
      email: "sailu@gmail.com",
      address: "amalapuram",
      is_admin: false,
    },
  ];

  beforeEach(() => {
    truncateTable("users");
    truncateTable("covid_info");
  });

  describe("/covid19/totalConfirmedCases", () => {
    it("should return total confirmed cases", async () => {
      const signUpResponse = await request(app.listen())
        .post("/signUp")
        .send(users[0]);

      expect(signUpResponse.status).toBe(200);
      expect(signUpResponse.body).toEqual({
        status: "Success",
        message: "User successfully signed up",
      });

      const loginResponse = await request(app).post("/auth/login").send({
        username: users[0].username,
        password: users[0].password,
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body).toBeDefined();
      expect(loginResponse.body.status).toBe("Success");
      expect(loginResponse.body.message).toBe("Successfully logged in");
      expect(loginResponse.body.results.accessToken).toBeDefined();
      expect(loginResponse.body.results.refreshToken).toBeDefined();

      const user1AccessToken = loginResponse.body.results.accessToken;

      const uploadResponse = await request(app)
        .post("/admin/uploadData")
        .set("Authorization", `Bearer ${user1AccessToken}`)
        .attach(
          "covidFiles",
          "./test/data/time_series_covid19_confirmed_global.csv"
        )
        .attach(
          "covidFiles",
          "./test/data/time_series_covid19_deaths_global.csv"
        )
        .attach(
          "covidFiles",
          "./test/data/time_series_covid19_recovered_global.csv"
        );

      expect(uploadResponse.status).toBe(200);

      const totalConfirmedCasesResponse = await request(app)
        .post("/covid19/totalConfirmedCases")
        .set("Authorization", `Bearer ${user1AccessToken}`);

      expect(totalConfirmedCasesResponse.status).toBe(200);
      expect(totalConfirmedCasesResponse.body.status).toBe("Success");
      expect(totalConfirmedCasesResponse.body.message).toBe(
        "Total confirmed cases"
      );
      expect(totalConfirmedCasesResponse.body.results).toBeDefined();
      expect(
        totalConfirmedCasesResponse.body.results.totalWorldWideCount
      ).toBeDefined();
      expect(
        totalConfirmedCasesResponse.body.results.countryWiseCount
      ).toBeDefined();
    }, 100000);
  });

  describe("/covid19/totalRecoveredCases", () => {
    it("should return total recovered cases", async () => {
      const signUpResponse = await request(app.listen())
        .post("/signUp")
        .send(users[0]);

      expect(signUpResponse.status).toBe(200);
      expect(signUpResponse.body).toEqual({
        status: "Success",
        message: "User successfully signed up",
      });

      const loginResponse = await request(app).post("/auth/login").send({
        username: users[0].username,
        password: users[0].password,
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body).toBeDefined();
      expect(loginResponse.body.status).toBe("Success");
      expect(loginResponse.body.message).toBe("Successfully logged in");
      expect(loginResponse.body.results.accessToken).toBeDefined();
      expect(loginResponse.body.results.refreshToken).toBeDefined();

      const user1AccessToken = loginResponse.body.results.accessToken;

      const uploadResponse = await request(app)
        .post("/admin/uploadData")
        .set("Authorization", `Bearer ${user1AccessToken}`)
        .attach(
          "covidFiles",
          "./test/data/time_series_covid19_confirmed_global.csv"
        )
        .attach(
          "covidFiles",
          "./test/data/time_series_covid19_deaths_global.csv"
        )
        .attach(
          "covidFiles",
          "./test/data/time_series_covid19_recovered_global.csv"
        );

      expect(uploadResponse.status).toBe(200);

      const totaRecoveredCasesResponse = await request(app)
        .post("/covid19/totalRecoveredCases")
        .set("Authorization", `Bearer ${user1AccessToken}`);

      expect(totaRecoveredCasesResponse.status).toBe(200);
      expect(totaRecoveredCasesResponse.body.status).toBe("Success");
      expect(totaRecoveredCasesResponse.body.message).toBe(
        "Total confirmed cases"
      );
      expect(totaRecoveredCasesResponse.body.results).toBeDefined();
      expect(
        totaRecoveredCasesResponse.body.results.totalWorldWideCount
      ).toBeDefined();
      expect(
        totaRecoveredCasesResponse.body.results.countryWiseCount
      ).toBeDefined();
    }, 100000);
  });

  describe("/covid19/totalDeaths", () => {
    it("should return total death cases", async () => {
      const signUpResponse = await request(app.listen())
        .post("/signUp")
        .send(users[0]);

      expect(signUpResponse.status).toBe(200);
      expect(signUpResponse.body).toEqual({
        status: "Success",
        message: "User successfully signed up",
      });

      const loginResponse = await request(app).post("/auth/login").send({
        username: users[0].username,
        password: users[0].password,
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body).toBeDefined();
      expect(loginResponse.body.status).toBe("Success");
      expect(loginResponse.body.message).toBe("Successfully logged in");
      expect(loginResponse.body.results.accessToken).toBeDefined();
      expect(loginResponse.body.results.refreshToken).toBeDefined();

      const user1AccessToken = loginResponse.body.results.accessToken;

      const uploadResponse = await request(app)
        .post("/admin/uploadData")
        .set("Authorization", `Bearer ${user1AccessToken}`)
        .attach(
          "covidFiles",
          "./test/data/time_series_covid19_confirmed_global.csv"
        )
        .attach(
          "covidFiles",
          "./test/data/time_series_covid19_deaths_global.csv"
        )
        .attach(
          "covidFiles",
          "./test/data/time_series_covid19_recovered_global.csv"
        );

      expect(uploadResponse.status).toBe(200);

      const totaDeathCasesResponse = await request(app)
        .post("/covid19/totalRecoveredCases")
        .set("Authorization", `Bearer ${user1AccessToken}`);

      expect(totaDeathCasesResponse.status).toBe(200);
      expect(totaDeathCasesResponse.body.status).toBe("Success");
      expect(totaDeathCasesResponse.body.message).toBe("Total confirmed cases");
      expect(totaDeathCasesResponse.body.results).toBeDefined();
      expect(
        totaDeathCasesResponse.body.results.totalWorldWideCount
      ).toBeDefined();
      expect(
        totaDeathCasesResponse.body.results.countryWiseCount
      ).toBeDefined();
    }, 100000);
  });
});
