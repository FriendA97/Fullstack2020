describe("Blog app", function () {
  beforeEach(function () {
    cy.resetDb();
  });
  it("open the login form", function () {
    cy.get("h2").should("have.text", "Login");
  });
  describe("Login", function () {
    it("log in succeeds", function () {
      cy.get("[data-testid='login-username-input']").type("ann");
      cy.get("[data-testid='login-password-input']").type("1234");
      cy.get("[data-testid='login-btn']").click();
      cy.get("[data-testid='logout-btn']").should("be.visible");
    });
    it("log in fails", function () {
      cy.get("[data-testid='login-username-input']").type("annn");
      cy.get("[data-testid='login-password-input']").type("12345");
      cy.get("[data-testid='login-btn']").click();
      cy.get("[data-testid='error']")
        .should("be.visible")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });
  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "ann", password: "1234" });
    });
    it("a blog can be created", function () {
      cy.get("[data-testid='new blog']").click();
      cy.get("[data-testid='title-input']").type("ABC");
      cy.get("[data-testid='url-input']").type("4567");
      cy.get("[data-testid='create-blog-btn']").click();
      cy.get("[data-testid='success']").should("be.visible");
      cy.get("[data-testid='blog-title-ABC']").should("have.text", "ABC");
    });
    it("users can like the post", function () {
      cy.createBlog({
        title: "ABC",
        url: "www.google.com",
        token: JSON.parse(localStorage.getItem("loggedInUser")).token,
      });
      cy.get("[data-testid='blog-expand-btn-0']").click();
      cy.request("GET", "http://localhost:3001/api/blogs").then((response) => {
        const blogs = response.body;
        cy.get("[data-testid='blog-like-counter-0']").click();
        cy.get("[data-testid='blog-likes-0']").should(
          "have.text",
          blogs[0].likes + 1
        );
        cy.get("[data-testid='logout-btn']").click();
        cy.addUser({ name: "LMAO", username: "TEST", password: "1234" });
        cy.login({ username: "TEST", password: "1234" });
        cy.get("[data-testid='blog-expand-btn-0']").click();
        cy.get("[data-testid='blog-like-counter-0']").click();
        cy.get("[data-testid='blog-likes-0']").should(
          "have.text",
          blogs[0].likes + 2
        );
      });
    });
    it("only user created the blog can delete it", function () {
      cy.createBlog({
        title: "ABC",
        url: "www.google.com",
        token: JSON.parse(localStorage.getItem("loggedInUser")).token,
      });
      cy.get("[data-testid='logout-btn']").click();
      cy.addUser({ name: "LMAO", username: "TEST", password: "1234" });
      cy.login({ username: "TEST", password: "1234" });
      cy.get("[data-testid='blog-expand-btn-0']").click();

      cy.get("[data-testid='blog-delete-0']").click();
      cy.get("[data-testid='blog-expand-btn-0']").should("be.visible");
      cy.get("[data-testid='logout-btn']").click();

      cy.login({ username: "ann", password: "1234" });
      cy.get("[data-testid='blog-expand-btn-0']").click();
      cy.get("[data-testid='blog-delete-0']").click();
      cy.get("[data-testid='blog-expand-btn-0']").should("not.exist");
    });
    it("show blogs likes in decesnding order", function () {
      cy.createBlog({
        title: "1",
        url: "2",
        likes: 0,
        token: JSON.parse(localStorage.getItem("loggedInUser")).token,
      });
      cy.createBlog({
        title: "ABC",
        url: "www.google.com",
        likes: 2,
        token: JSON.parse(localStorage.getItem("loggedInUser")).token,
      });
      cy.get("[data-testid^='blog-expand-btn']").each(($el) => {
        $el.click();
      });
      cy.get("[data-testid^=blog-likes-").then((likes) => {
        assert.isAbove(Number(likes[0].innerText), Number(likes[1].innerText));
      });
    });
  });
});
