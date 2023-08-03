function findAuthorById(authors = [], id = 0) {
  const result = authors.find((authorObj, idx) => {
    return authorObj.id === id;
  });
  return result;
}

module.exports = findAuthorById;

function findBookById(books = [], id = 0) {
  const result = books.find((bookObj, idx) => {
    return bookObj.id === id;
  });
  return result;
}

function partitionBooksByBorrowedStatus(books = []) {
  const checkedOut = books.filter((bookObj) => {
    const { borrows } = bookObj;
    if (borrows[0].returned === false) {
      return bookObj;
    }
  });
  const available = books.filter((bookObj) => {
    const { borrows } = bookObj;
    if (borrows[0].returned === true) {
      return bookObj;
    }
  });
  return [checkedOut, available];
}

function getBorrowersForBook(book = {}, accounts = []) {
  const results = [];
  const { borrows } = book;
  for (let borrowElem of borrows) {
    const { id, returned } = borrowElem;
    const borrowerObj = accounts.find((accountElem) => {
      return accountElem.id === id;
    });
    borrowerObj.returned = returned;
    results.push(borrowerObj);
    if (results.length === 10) break;
  }
  return results;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
