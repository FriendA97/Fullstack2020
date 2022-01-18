const blogsRouter = require("express").Router();
const blogController = require("../controllers/blogs");

blogsRouter.get("/", blogController.getBlogs);

blogsRouter.get("/:id", blogController.getBlogById);

blogsRouter.post("/", blogController.postBlog);

blogsRouter.delete("/:id", blogController.deleteBlog);

blogsRouter.put("/:id", blogController.putBlog);

module.exports = blogsRouter;
