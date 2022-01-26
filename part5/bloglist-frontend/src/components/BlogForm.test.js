import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("render the blog creation form", () => {
  const blogForm = render(<BlogForm />);
  const titleInput = blogForm.queryByTestId("title-input");
  const authorInput = blogForm.queryByTestId("author-input");
  const urlInput = blogForm.queryByTestId("url-input");
  expect(titleInput).toBeInTheDocument();
  expect(authorInput).toBeInTheDocument();
  expect(urlInput).toBeInTheDocument();
});

test("form submit works", () => {
  const mockHandler = jest.fn();
  const blogForm = render(<BlogForm createBlog={mockHandler} />);
  const titleInput = blogForm.queryByTestId("title-input");
  const urlInput = blogForm.queryByTestId("url-input");
  const form = blogForm.queryByTestId("blog-create-form");

  fireEvent.change(titleInput, {
    target: { value: "this is the title" },
  });
  fireEvent.change(urlInput, {
    target: { value: "this is the url" },
  });
  fireEvent.submit(form);
  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0].title).toBe("this is the title");
  expect(mockHandler.mock.calls[0][0].url).toBe("this is the url");
});
