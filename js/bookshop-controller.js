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
            <td class="border-end">${book.id}</td>
            <td class="border-end">${book.name}</td>
            <td class="border-end">${book.price}</td>
            <td class="border-end">
            <button data-trans="read-book" class="button btn btn-primary" onclick="onReadClick('${book.id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">${getTrans('read-book')}</button>
            <button data-trans="update-book" class="button btn btn-primary" onclick="onUpdateClick('${book.id}')">${getTrans('update-book')}</button>
            <button data-trans="delete-book" class="button btn btn-primary" onclick="onDeleteClick('${book.id}')">${getTrans('delete-book')}</button>
            </td>
            <td>${book.rate}</td>
        </tr>`
    })
    elTableBody.innerHTML = strHTMLs.join('');

}

function setPageBtnsHTMLs() {
    var strHTMLs = ''
    for (var i = 0; i < gPageCount; i++) {
        var buttonSize = (i === gPageIdx) ? 'btn-lg' : 'btn-sm'
        strHTMLs += `<button class="page-${i} ${buttonSize} btn-primary m-2" onclick="onSetPage(${i})">${(i + 1)}</button>`
    }
    return strHTMLs
}

function renderPageBtns() {
    var strHTMLs = setPageBtnsHTMLs();
    var elNextBtn = document.querySelector('.next-page');
    var elPrevBtn = document.querySelector('.prev-page');

    document.querySelector('.page-numbers').innerHTML = strHTMLs
    var elCurrPageBtn = document.querySelector(`.page-${gPageIdx}`)
        // elCurrPageBtn.classList.add('btn-lg')
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
    document.querySelector('.details-conteiner-father').classList.add('collapse')
}

function onReadClick(id) {
    var book = getBookById(id)
    document.querySelector('.modal-header .title').innerText = book.name;
    document.querySelector('.modal-body .img').innerHTML = `<img src="${book.imgUrl}">`;
    document.querySelector('.modal-body .content').innerText = book.content;
    document.querySelector('.modal-body span.rate').innerText = book.rate;
    document.querySelector('.modal-body .rating').innerHTML = `<button class="btn btn-primary" onclick="onUpdateRating('${book.id}', -1)">-</button><span class="rate">  ${book.rate}  </span><button class="btn btn-primary" onclick="onUpdateRating('${book.id}', 1)">+</button>`;
    // document.querySelector('.details-conteiner-father').classList.toggle('collapse')
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
    var elBookAdding = document.querySelector('.book-adding-section');
    elBookAdding.classList.toggle('collapse')
    renderPageBtns();
}

function onAddBook() {
    var elBookAdding = document.querySelector('.book-adding-section');
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
    if (lang === 'he') document.body.style.direction = 'rtl';
    else document.body.style.direction = 'ltr'
    doTrans();
}