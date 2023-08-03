const getTotalBooksCount = (books = []) => books.length;

const getTotalAccountsCount = (accounts = []) => accounts.length;

function getBooksBorrowedCount(books = []) {
  const total = books.reduce((acc, bookObj) => {
    const { borrows } = bookObj;
    if (borrows[0].returned === false) {
      acc += 1;
    }
    return acc;
  }, 0);
  return total;
}

function getMostCommonGenres(books = []) {
  const results = [];
  const lookup = {};
  books.forEach((bookObject) => {
    const { genre } = bookObject;
    if (lookup[genre] === undefined) {
      lookup[genre] = 1;
    } else {
      lookup[genre]++;
    }
  });
  for (let key in lookup) {
    const obj = { name: key, count: lookup[key] };
    results.push(obj);
  }
  results.sort((elemA, elemB) => {
    return elemB.count - elemA.count;
  });
  return results.slice(0, 5);
}

function getMostPopularBooks(books = []) {
  const results = books.map(({ title, borrows }) => {
    return { name: title, count: borrows.length };
  });
  results.sort((elemA, elemB) => {
    return elemB.count - elemA.count;
  });
  return results.slice(0, 5);
}

const { findAuthorById } = require("./books");

function getMostPopularAuthors(books = [], authors = []) {
  const lookup = {};
  const results = [];
  books.forEach(({ authorId, borrows }) => {
    if (lookup[authorId] === undefined) {
      lookup[authorId] = borrows.length;
    } else {
      lookup[authorId] += borrows.length;
    }
  });
  for (let key in lookup) {
    const authorObj = findAuthorById(authors, Number(key));
    const authorName = authorNameHelper(authorObj);
    const obj = { name: authorName, count: lookup[key] };
    results.push(obj);
  }
  results.sort((elemA, elemB) => {
    return elemB.count - elemA.count;
  });

  return results.slice(0, 5);
}

const authorNameHelper = (author = {}) =>
  `${author.name.first} ${author.name.last}`;

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
