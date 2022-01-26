import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Blog from "./Blog";

jest.mock("../services/blogs");

const updateMock = jest.fn().mockResolvedValue({
  id: "1",
  title: "123",
  author: "234",
  likes: 6,
  url: "www.google.com",
  user: { id: "numba-1", username: "ann-test" },
});

const blogData = {
  id: "1",
  title: "123",
  author: "234",
  likes: 4,
  url: "www.google.com",
  user: { id: "numba-1", username: "ann-test" },
};

test("render blog with its title and author without details", () => {
  const mockHandler = jest.fn();
  const blog = render(
    <Blog
      blog={blogData}
      setBlogs={mockHandler}
      update={mockHandler}
      deleteBlog={mockHandler}
    />
  );
  const title = blog.queryByTestId("blog-title");
  const author = blog.queryByTestId("blog-author");
  const likes = blog.queryByTestId(`blog-likes-${blogData.id}`);

  expect(title).toHaveTextContent("123");
  expect(author).toHaveTextContent("234");
  expect(likes).toBeNull();
});

test("render url and likes of blog when button is clicked", () => {
  const mockHandler = jest.fn();
  const blog = render(
    <Blog
      blog={blogData}
      setBlogs={mockHandler}
      update={mockHandler}
      deleteBlog={mockHandler}
    />
  );
  const button = blog.queryByTestId("blog-expand-btn");
  fireEvent.click(button);
  const likes = blog.queryByTestId(`blog-likes-${blogData.id}`);
  const url = blog.queryByTestId(`blog-url-${blogData.id}`);
  expect(likes).toBeInTheDocument();
  expect(url).toBeInTheDocument();
});

test("like button is called when clicked", async () => {
  const mockHandler = jest.fn();
  const blog = render(
    <Blog
      blogs={[blogData]}
      blog={blogData}
      update={updateMock}
      setBlogs={mockHandler}
      deleteBlog={mockHandler}
    />
  );

  const button = blog.queryByTestId("blog-expand-btn");
  fireEvent.click(button);
  const likesCounter = blog.queryByText("like");
  fireEvent.click(likesCounter);
  fireEvent.click(likesCounter);

  await waitFor(() => {
    expect(updateMock).toHaveBeenCalledTimes(2);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
