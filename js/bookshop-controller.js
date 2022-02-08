'use strict'

// var books = getBooksForDisplay()


function init() {
    //document.querySelector('.main-table').style.display = 'none'
    // _saveBooksToStorage();
    renderBooks();
    renderPageBtns();
}

function renderBooks() {
    var elTableBody = document.querySelector('.table-content')
    var books = getBooksForDisplay();
    if (!books) return
        //document.querySelector('.main-table').style.display = 'table'
    var strHTMLs = books.map(book => {
        return `<tr>
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td>
            <button data-trans="read-book" class="button" onclick="onReadClick('${book.id}')">${getTrans('read-book')}</button>
            <button data-trans="update-book" class="button" onclick="onUpdateClick('${book.id}')">${getTrans('update-book')}</button>
            <button data-trans="delete-book" class="button" onclick="onDeleteClick('${book.id}')">${getTrans('delete-book')}</button>
            </td>
            <td>${book.rate}</td>
        </tr>`
    })
    elTableBody.innerHTML = strHTMLs.join('');

}

function renderPageBtns() {
    var strHTMLs = setPageBtnsHTMLs();
    var elNextBtn = document.querySelector('.next-page');
    var elPrevBtn = document.querySelector('.prev-page');
    elNextBtn.classList.remove('faded');
    elPrevBtn.classList.remove('faded');
    if (gPageIdx === 0) elPrevBtn.classList.add('faded');
    if (gPageIdx === gPageCount - 1) elNextBtn.classList.add('faded');

    document.querySelector('.page-numbers').innerHTML = strHTMLs
    var elCurrPageBtn = document.querySelector(`.page-${gPageIdx}`)
    elCurrPageBtn.classList.add('curr-page')
}


function onSetPage(targetPage) {
    setPage(targetPage);
    renderPageBtns();
    renderBooks();
}

// function onSetNextPage() {
//     setNextPage();
//     renderBooks();
// }

function onSortList(sortBy) {
    sortList(sortBy);
    renderBooks();
}

function onUpdateRating(bookId, val) {
    updateBookRate(bookId, val);
    var book = getBookById(bookId)
    document.querySelector('span.rate').innerText = `  ${book.rate}  `;
    renderBooks();
}

function onCloseModal() {
    // renderBooks();
    document.querySelector('.details-container').classList.add('hide')
}

function onReadClick(id) {
    var book = getBookById(id)
    document.querySelector('h3.book-name').innerText = book.name;
    document.querySelector('.details-container .img').innerHTML = `<img src="${book.imgUrl}">`;
    document.querySelector('div.content').innerText = book.content;
    document.querySelector('span.rate').innerText = book.rate;
    document.querySelector('div.rating').innerHTML = `<button onclick="onUpdateRating('${book.id}', -1)">-</button><span class="rate">  ${book.rate}  </span><button onclick="onUpdateRating('${book.id}', 1)">+</button>`;
    document.querySelector('.details-container').classList.toggle('hide')
}

function onUpdateClick(id) {
    var price = +prompt('New price?(insert only numbers)');
    if (!price) return
    updateBookPrice(id, price);
    renderBooks();
}

function onDeleteClick(id) {
    deleteBook(id);
    renderBooks();
    renderPageBtns();
}

function onAddBookClick() {
    var elBookAdding = document.querySelector('.book-adding');
    elBookAdding.classList.toggle('collapse')
    renderPageBtns();
}

function onAddBook() {
    var elBookAdding = document.querySelector('.book-adding');
    var elBookName = document.querySelector('input[name=book-name]');
    var elBookPrice = document.querySelector('input[name=book-price]');
    var bookName = elBookName.value.trim();
    var bookPrice = parseInt(elBookPrice.value.trim()) + '$';
    if (bookName === '' || bookPrice === '') return;
    addBook(bookName, bookPrice);
    elBookName.value = ''
    elBookPrice.value = ''
    elBookAdding.classList.add('collapse')
    renderBooks();
}

function onSetLang(lang) {
    setLang(lang);
    doTrans();
}