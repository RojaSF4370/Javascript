const form = document.getElementById('form');
const book = document.getElementById('book');
const email = document.getElementById('email');
const authorname = document.getElementById('authorname');
const published = document.getElementById('published');
const price = document.getElementById('price');
const year = new Date();
const currentyear = year.getFullYear();
//success
function showSucces(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}
//error
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}
//validatebook
function validatebook() {

    if (book.value.trim() === '') {
        showError(book, "book name is required");
        return false;
    }
    else if (/\d/.test(book.value)) {
        showError(book, "numeric values are not allowed");
        return false;

    } else if (book.value.length > 50) {
        showError(book, "book name should not exceed 50");
        return false;
    } else {
        showSucces(book);
        return true;

    }

}
//name
function validatename() {

    if (authorname.value.trim() === '') {
        showError(authorname, "authour name is required");
        return false;
    }
    else if (/\d/.test(authorname.value)) {
        showError(authorname, "numeric values are not allowed");
        return false;


    } else if ((/[^a-zA-Z]/g.test(authorname.value))) {
        showError(authorname, "Special Character not allowed");
        return false;

    } else if (authorname.length > 50) {
        console.log(authorname.value);
        showError(authorname, "authour name should not exceed 50");
        return false;

    } else {
        showSucces(authorname);
        return true;
    }

}
//publish
function validatepublish() {
    if (published.value.trim() === '') {
        showError(published, "publish year is required");
        return false;
    }
    else if ((published.value > currentyear || published.value < 1000) || published.value.Length > 4) {
        showError(published, "please enter valid published year");
        return false;

    }
    else if (!(Number.isInteger(Number(published.value)))) {
        showError(published, "please enter valid published year");
        return false;

    }
    else {
        showSucces(published);

        return true;
    }
}
//validate price
function validateprice() {

    if (price.value.trim() === '') {
        showError(price, "price is required");
        return false;
    }
    else if (!(Number.isInteger(Number(price.value)))) {
        showError(price, "alphabets are not allowed in price ");
        return false;

    }
    else if (price.value < 1) {
        showError(price, "please enteravalid amount ");
        return false;

    }
    else {
        showSucces(price);
        return true;
    }

}
//validatemail
function validateemail() {

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.value.trim() === '') {
        showError(email, "email is required");
        return false;
    }
    else if (re.test(email.value.trim())) {
        showSucces(email);
        return true;
    }
    else {
        showError(email, "Enter a valid email");
        return false;
    }
}
//validate form
function validateform() {

    var books = validatebook();
    var emails = validateemail();
    var names = validatename();
    var publisher = validatepublish();
    var price = validateprice();
    console.log(books);
    if (books && emails && names && publisher && price) {
        const data = {
            category: document.getElementById('category').value,
            book: document.getElementById('book').value,
            email: document.getElementById('email').value,
            authorname: document.getElementById('authorname').value,
            published: document.getElementById('published').value,
            price: document.getElementById('price').value
        };
        const bookJson = JSON.stringify(data);
        sessionStorage.setItem('currentbook', bookJson);
        return true;

    } else {
        console.log('Form has errors. Please check and correct.');
        return false;
    }
}
//status
function status(){
    const currentBookData = sessionStorage.getItem('currentbook');
    if (currentBookData === null)
    {
        alert("No book history to show");
    }else{
        window.open("show.html","__self__")
    }
}
//getdata
function getdata(){
    if(sessionStorage){
        const currentBookData = sessionStorage.getItem('currentbook');

        if (currentBookData) {
            // Parse the JSON data
            const bookDetails = JSON.parse(currentBookData);
            document.getElementById('category').innerText=bookDetails.category;
            // Display book details in HTML elements
            document.getElementById('bookName').innerText = bookDetails.book;
            document.getElementById('authorName').innerText = bookDetails.authorname;
            document.getElementById('email').innerText = bookDetails.email;
            document.getElementById('publishedYear').innerText = bookDetails.published;
            document.getElementById('price').innerText = bookDetails.price;
        }
    }
}

