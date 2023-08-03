function findAccountById(accounts = [], id = "") {
  const result = accounts.find((element, idx) => {
    return element.id === id;
  });
  return result;
}

function sortAccountsByLastName(accounts = []) {
  const result = accounts.sort((accountA, accountB) => {
    return accountA.name.last < accountB.name.last ? -1 : 1;
  });
  return result;
}

function getTotalNumberOfBorrows(account = {}, books = []) {
  let total = 0;
  const { id } = account;

  books.forEach((bookElement) => {
    const { borrows } = bookElement;
    borrows.forEach((borrowElement) => {
      if (borrowElement.id === id) total += 1;
    });
  });
  return total;
}

const { findAuthorById } = require("./books");

function getBooksPossessedByAccount(account = {}, books = [], authors = []) {
  const results = [];
  const { id } = account;
  for (let book of books) {
    const { borrows, authorId } = book;
    if (borrows[0].id === id && borrows[0].returned === false) {
      const foundAuthor = findAuthorById(authors, authorId);
      const result = book;
      result.author = foundAuthor;
      results.push(result);
    }
  }
  return results;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
