'use strict'


const PAGE_SIZE = 7;
const STORAGE_KEY = 'gBooks'
var gPageIdx = 0;
var gBooks = _createBooks();
var gPageCount;
_saveBooksToStorage();


function addBook(name, price) {
    gBooks.unshift({
        id: makeId(3),
        name: name,
        price: price,
        content: makeLorem(),
        imgUrl: 'img/book.png',
        rate: 0
    })

    _saveBooksToStorage();
}


function setPage(target) {
    if (target === 'prev') {
        if (gPageIdx === 0) return;
        gPageIdx--;
    } else if (target === 'next') {
        if (gPageIdx === gPageCount - 1) return;
        gPageIdx++;
    } else {
        gPageIdx = target;
    }
}


function getPageCount() {
    var pageCount = Math.ceil(gBooks.length / PAGE_SIZE)
    return pageCount;
}

function setNextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0
    }
}

function sortList(sortBy) {
    if (sortBy === 'title') {
        gBooks.sort((b1, b2) => {
            if (b2.name.toUpperCase() > b1.name.toUpperCase()) return 1;
            else return -1;
        })
    } else if (sortBy === 'price') {
        gBooks.sort((b1, b2) => { return parseInt(b1.price) - parseInt(b2.price) })
    }
    _saveBooksToStorage;
}

function updateBookRate(id, val) {
    var book = gBooks.find(book => id === book.id);
    if (book.rate === 0 && val === -1 || book.rate === 10 && val === 1) return;
    book.rate = book.rate + val;
    _saveBooksToStorage();
}

function getBookById(id) {
    return gBooks.find(book => id === book.id);
}

function updateBookPrice(id, price) {
    var book = gBooks.find(book => id === book.id);
    book.price = price + '$';
    _saveBooksToStorage();
}


function deleteBook(id) {
    var bookIdx = gBooks.findIndex(book => id === book.id)
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}


function getBooksForDisplay() {
    const startIdx = gPageIdx * PAGE_SIZE;
    gPageCount = getPageCount();
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE);
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY);
    if (!books || !books.length) {
        books = [_createBook(), _createBook(), _createBook(), _createBook(), _createBook(), _createBook(), _createBook(), _createBook(), _createBook(), _createBook(), _createBook(), _createBook(), _createBook(), _createBook(), _createBook(), _createBook(), _createBook(), _createBook(), _createBook(), _createBook(), _createBook()];
    }
    return books;
}


function _createBook() {
    return {
        id: makeId(3),
        name: makeLorem(2),
        price: getRandomIntInclusive(0, 100) + '$',
        content: makeLorem(),
        imgUrl: 'img/book.png',
        rate: 0
    }
}


function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}