const app = require("../../src/app");
const request = require("supertest").agent(app.listen());

const { truncateTable } = require("./helper");

describe("/auth", () => {
  const users = [
    {
      name: "Dhanalakshmi",
      username: "dhana",
      password: "dhana123",
      confirm_password: "dhana123",
      email: "dhanalakshmi.narala@gmail.com",
      address: "brahmapuri",
    },
    {
      name: "Sailaja",
      username: "sailu",
      password: "sailu123",
      confirm_password: "sailu123",
      email: "sailu@gmail.com",
      address: "amalapuram",
    },
  ];

  beforeEach(() => {
    truncateTable("users");
  });

  describe("/auth/login", () => {
    it("should login for user1", async () => {
      const signUpResponse = await request.post("/signUp").send(users[0]);

      expect(signUpResponse.status).toBe(200);
      expect(signUpResponse.body).toEqual({
        status: "Success",
        message: "User successfully signed up",
      });

      const loginResponse = await request.post("/auth/login").send({
        username: users[0].username,
        password: users[0].password,
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body).toBeDefined();
      expect(loginResponse.body.status).toBe("Success");
      expect(loginResponse.body.message).toBe("Successfully logged in");
      expect(loginResponse.body.results.accessToken).toBeDefined();
      expect(loginResponse.body.results.refreshToken).toBeDefined();
    });

    it("should not login for user2 as she is not signed up", async () => {
      const loginResponse = await request.post("/auth/login").send({
        username: users[1].username,
        password: users[1].password,
      });

      expect(loginResponse.status).toBe(400);
      expect(loginResponse.body).toBeDefined();
      expect(loginResponse.body.status).toBe("Failure");
      expect(loginResponse.body.error).toBe("User not found");
    });
  });

  describe("/auth/logout", () => {
    it("should logout for user1", async () => {
      const signUpResponse = await request.post("/signUp").send(users[0]);

      expect(signUpResponse.status).toBe(200);
      expect(signUpResponse.body).toEqual({
        status: "Success",
        message: "User successfully signed up",
      });

      const loginResponse = await request.post("/auth/login").send({
        username: users[0].username,
        password: users[0].password,
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body).toBeDefined();
      expect(loginResponse.body.status).toBe("Success");
      expect(loginResponse.body.message).toBe("Successfully logged in");
      expect(loginResponse.body.results.accessToken).toBeDefined();
      expect(loginResponse.body.results.refreshToken).toBeDefined();

      const logoutResponse = await request.delete("/auth/logout");
      expect(logoutResponse.status).toBe(204);
    });

    it("should logout for user2", async () => {
      const signUpResponse = await request.post("/signUp").send(users[1]);

      expect(signUpResponse.status).toBe(200);
      expect(signUpResponse.body).toEqual({
        status: "Success",
        message: "User successfully signed up",
      });

      const loginResponse = await request.post("/auth/login").send({
        username: users[1].username,
        password: users[1].password,
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body).toBeDefined();
      expect(loginResponse.body.status).toBe("Success");
      expect(loginResponse.body.message).toBe("Successfully logged in");
      expect(loginResponse.body.results.accessToken).toBeDefined();
      expect(loginResponse.body.results.refreshToken).toBeDefined();

      const logoutResponse = await request.delete("/auth/logout");
      expect(logoutResponse.status).toBe(204);
    });
  });

  describe("/auth/getNewAccessToken", () => {
    it("should get new access token for user1", async () => {
      const signUpResponse = await request.post("/signUp").send(users[0]);

      expect(signUpResponse.status).toBe(200);
      expect(signUpResponse.body).toEqual({
        status: "Success",
        message: "User successfully signed up",
      });

      const loginResponse = await request.post("/auth/login").send({
        username: users[0].username,
        password: users[0].password,
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body).toBeDefined();
      expect(loginResponse.body.status).toBe("Success");
      expect(loginResponse.body.message).toBe("Successfully logged in");
      expect(loginResponse.body.results.accessToken).toBeDefined();
      expect(loginResponse.body.results.refreshToken).toBeDefined();

      const user1RefreshToken = loginResponse.body.results.refreshToken;
      const newAccessTokenResponse = await request
        .post("/auth/getNewAccessToken")
        .send({
          refresh_token: user1RefreshToken,
        });

      expect(newAccessTokenResponse.status).toBe(200);
      expect(newAccessTokenResponse.body.status).toBe("Success");
      expect(newAccessTokenResponse.body.message).toBe(
        "New access token generated"
      );
      expect(newAccessTokenResponse.body.results.accessToken).toBeDefined();
    });

    it("should get new access token for user2", async () => {
      const signUpResponse = await request.post("/signUp").send(users[1]);

      expect(signUpResponse.status).toBe(200);
      expect(signUpResponse.body).toEqual({
        status: "Success",
        message: "User successfully signed up",
      });

      const loginResponse = await request.post("/auth/login").send({
        username: users[1].username,
        password: users[1].password,
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body).toBeDefined();
      expect(loginResponse.body.status).toBe("Success");
      expect(loginResponse.body.message).toBe("Successfully logged in");
      expect(loginResponse.body.results.accessToken).toBeDefined();
      expect(loginResponse.body.results.refreshToken).toBeDefined();

      const user2RefreshToken = loginResponse.body.results.refreshToken;
      const newAccessTokenResponse = await request
        .post("/auth/getNewAccessToken")
        .send({
          refresh_token: user2RefreshToken,
        });

      expect(newAccessTokenResponse.status).toBe(200);
      expect(newAccessTokenResponse.body.status).toBe("Success");
      expect(newAccessTokenResponse.body.message).toBe(
        "New access token generated"
      );
      expect(newAccessTokenResponse.body.results.accessToken).toBeDefined();
    });
  });
});
