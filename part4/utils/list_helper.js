const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => acc + cur.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.find((blog) => {
    const max = Math.max(...blogs.map((blog) => blog.likes));

    return blog.likes === max;
  });
};

const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author);
  const uniqueAuthors = authors.filter(
    (author, index) => authors.indexOf(author) === index
  );

  const mostBlogsAuthor = uniqueAuthors
    .map((author) => {
      const totalBlogs = blogs.filter((blog) => blog.author === author);
      return { author, blogs: totalBlogs.length };
    })
    .reduce((max, curr) => {
      max = max.blogs > curr.blogs ? max : curr;
      return max;
    });
  return mostBlogsAuthor;
};

const mostLikes = (blogs) => {
  const authors = blogs.map((blog) => blog.author);
  const uniqueAuthors = authors.filter(
    (author, index) => authors.indexOf(author) === index
  );

  const mostLikesAuthor = uniqueAuthors
    .map((author) => {
      const totalBlogs = blogs.filter((blog) => blog.author === author);

      return {
        author,
        likes: totalBlogs.reduce((sum, curr) => {
          sum = sum + curr.likes;
          return sum;
        }, 0),
      };
    })
    .reduce((max, curr) => {
      max = max.likes > curr.likes ? max : curr;
      return max;
    });

  return mostLikesAuthor;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
