const bookFirst = {
  title: "Хлопок одной ладонью",
  description:
    "Жизнь на Земле — непостижимая, вездесущая, кишащая миллионами ног, сучков, колючек и зубов вакханалия, в которой мы существуем и из которой мы происходим.",
  author: "Николай Кукушкин",
};

const bookSecond = {
  title: "Древний",
  description:
    "Серия книг в жанре боевой фантастики «Древний», принесшая широкую известность писателю Сергею Тармашеву, описывает жизнь на земле после ядерной катастрофы.",
  author: "Сергей Тармашев",
};

const bookThird = {
  title: "Темная Башня",
  description:
    "Роланд Дискейн – последний представитель древнего ордена стрелков. Вместе с верными сторонниками он совершает поход по постапокалиптической земле.",
  author: "Стивен Кинг",
};

describe("Favorite book spec", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("test@test.com", "test");
  });

  it("Should add new book", () => {
    cy.addBook(bookFirst);
    cy.get(".card-title").should("contain.text", bookFirst.title);
  });

  it("Should add new book to favorite", () => {
    cy.addFavoriteBook(bookSecond);
    cy.visit("/favorites");
    cy.get(".card-title").should("contain.text", bookSecond.title);
  });

  it("Should add book to favorite through 'Book list' page", () => {
    cy.addBookNoFavorite(bookFirst);
    cy.contains(bookFirst.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.visit("/favorites");
    cy.contains(bookFirst.title).should("be.visible");
  });

  it("Should delete book from favorite", () => {
    cy.visit("/favorites");
    cy.contains(bookSecond.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains(bookSecond.title).should("not.exist");
  });
});
