const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { initalBlogs, blogsInDb } = require("../utils/test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("test", 10);
  const user = new User({ username: "ann", passwordHash });
  await user.save();
  const userFetched = await User.findOne({ username: "ann" });
  const blogsObject = initalBlogs.map(
    (blog) => new Blog({ ...blog, user: userFetched._id })
  );

  const promiseArray = blogsObject.map((blog) => blog.save());

  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-type", /application\/json/);
});

test("unique identifier of blog is named 'id'", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((blog) => expect(blog.id).toBeDefined());
});
test("cannot a new blog without authorizations", async () => {
  const blogsBefore = await blogsInDb();
  const testBlog = {
    title: "A Test Book",
    author: "An",
    url: "http://google.com",
  };

  await api
    .post("/api/blogs")
    .send(testBlog)
    .expect(401)
    .expect("Content-Type", /application\/json/);

  const blogs = await blogsInDb();
  expect(blogs).toHaveLength(blogsBefore.length);
});
test("can add new blog", async () => {
  const blogsBefore = await blogsInDb();
  const testBlog = {
    title: "A Test Book",
    author: "An",
    url: "http://google.com",
  };

  const logInResponse = await api
    .post("/api/login")
    .send({ username: "ann", password: "test" })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200);

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${logInResponse.body.token}`)
    .send(testBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)
    .then()
    .catch((error) => console.log(error));

  const blogsAfter = await blogsInDb();
  expect(blogsAfter).toHaveLength(blogsBefore.length + 1);
  const titles = blogsAfter.map((blog) => blog.title);
  expect(titles).toContain(testBlog.title);
});

test("if blog is added without a likes property then it would be 0", async () => {
  const testBlog = {
    title: "A Test Book",
    author: "An",
    url: "http://google.com",
  };
  const logInResponse = await api
    .post("/api/login")
    .send({ username: "ann", password: "test" })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200);

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${logInResponse.body.token}`)
    .send(testBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await blogsInDb();
  expect(blogs[blogs.length - 1].likes).toEqual(0);
});

test("cannot add a blog with a title or url", async () => {
  const testBlog = {
    author: "An",
  };
  const logInResponse = await api
    .post("/api/login")
    .send({ username: "ann", password: "test" })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200);

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${logInResponse.body.token}`)
    .send(testBlog)
    .expect(400);

  const blogs = await blogsInDb();
  expect(blogs).toHaveLength(initalBlogs.length);
});

afterAll(() => mongoose.connection.close());
