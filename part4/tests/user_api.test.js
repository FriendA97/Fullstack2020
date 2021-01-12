const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { usersInDb } = require("../utils/test_helper");
const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");

const api = supertest(app);

describe("Users API", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("test", 10);
    const user = new User({ username: "ann", passwordHash });
    await user.save();
  });
  test("Can create new user", async () => {
    const usersBefore = await usersInDb();
    const newUser = {
      username: "notann",
      name: "An Nguyen",
      password: "12345",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAfter = await usersInDb();
    expect(usersAfter.length).toEqual(usersBefore.length + 1);
    const usernames = usersAfter.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });
  test("cannot create new user without password or not enough characters", async () => {
    const usersBefore = await usersInDb();
    const newUser = { username: "abc" };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toEqual("Invalid username or password");

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersBefore.length);
  });
  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "ann",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toEqual("Username has been taken");

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  afterAll(() => mongoose.connection.close());
});
