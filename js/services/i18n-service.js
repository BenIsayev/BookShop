'use strict'


var gCurrLang = 'en';
var gTrans = {
    headline: {
        en: 'Welcome to my bookshop',
        he: 'ברוכים הבאים לחנות הספרים שלי'
    },
    'add-book-btn': {
        en: 'Add a book',
        he: 'הוסף ספר'
    },
    'book-adder': {
        en: 'Add',
        he: 'הוסף'
    },
    'book-name-ask': {
        en: 'What is the book name?',
        he: 'מה הוא שם הספר?'
    },
    'book-price-ask': {
        en: 'What is the book price?',
        he: 'מה מחיר הספר?'
    },
    id: {
        en: 'ID',
        he: 'תז'
    },
    title: {
        en: 'Title',
        he: 'כותרת'
    },
    price: {
        en: 'Price',
        he: 'מחיר'
    },
    actions: {
        en: 'Actions',
        he: 'פעולות'
    },
    rating: {
        en: 'Rating',
        he: 'דירוג'
    },
    'read-book': {
        en: 'Read',
        he: 'קרא'
    },
    'update-book': {
        en: 'Update',
        he: 'עדכן',
    },
    'delete-book': {
        en: 'Delete',
        he: 'מחק'
    },
    'modal-your-rating': {
        en: 'Your rating:',
        he: 'הדירוג שלך'
    },
    'close-modal-btn': {
        en: 'Close',
        he: 'סגור'
    },
    currency: {
        en: '$',
        he: '₪'
    }
}

var gCurrencies = {
    en: 'USD',
    he: 'ILS'
}

function setLang(lang) {
    gCurrLang = lang;
}


function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach((el) => {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey);
        if (el.nodeName === 'INPUT') el.placeholder = txt;
        else el.innerText = txt

    })
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];

    var txt = keyTrans[gCurrLang];
    if (!txt) txt = keyTrans.en;
    return txt
}