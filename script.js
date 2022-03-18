let myLibrary = [];
const libraryContainer = document.querySelector('.library');

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = false;
	this.info = function () {
		return `${this.title} by ${this.author}, ${pages} pages,${
			read ? ' was read' : ' not read yet'
		}`;
	};
}

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

function addBookToLibrary(title, author, pages, read) {
	myLibrary.push(new Book(title, author, pages, read));
}

function appendBookCard(targetHTML, book) {
	let bookCard = document.querySelector('.blueprint-card').cloneNode('deep');
	bookCard.classList.remove('blueprint-card');
	bookCard.querySelector('.author').innerHTML = book.author;
	bookCard.querySelector('.book-title').innerHTML = book.title;
	targetHTML.insertBefore(bookCard, targetHTML.lastElementChild);
	//event listeners
}

function removeBookCard(book) {
	//remove card
	//remove array entry
}

addBookToLibrary('Title1', 'Author1', 22, true);
addBookToLibrary('Title2', 'Author3', 122, false);
addBookToLibrary('Title10', 'Author4', 322, true);

appendBookCard(libraryContainer, myLibrary[0]);
appendBookCard(libraryContainer, myLibrary[1]);
appendBookCard(libraryContainer, myLibrary[2]);
