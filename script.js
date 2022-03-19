let myLibrary = [];
const libraryContainer = document.querySelector('.library');

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.toggleRead = function () {
	this.read = !this.read;
};

function addBookToLibrary(book) {
	appendBookCard(libraryContainer, book);
}

function appendBookCard(targetHTML, book) {
	let bookCard = document.querySelector('.blueprint-card').cloneNode('deep');
	bookCard.classList.remove('blueprint-card');
	bookCard.querySelector('.author').innerHTML = book.author;
	bookCard.querySelector('.book-title').innerHTML = book.title;
	bookCard.querySelector('.book-pages').innerHTML = `${book.pages} pages`;
	if (book.read)
		bookCard.querySelector('.card-mark-read').classList.add('book-read');
	targetHTML.insertBefore(bookCard, targetHTML.lastElementChild);
	bookCard.querySelector('.card-mark-read').addEventListener('click', (e) => {
		toggleBookRead(bookCard, book);
	});
	bookCard.querySelector('.card-delete').addEventListener('click', (e) => {
		removeBookCard(bookCard, book);
	});
}

function removeBookCard(bookCard, book) {
	bookCard.remove();
}

function toggleBookRead(bookCard, book) {
	book.toggleRead();
	bookCard.querySelector('.card-mark-read').classList.toggle('book-read');
}

addBookToLibrary(new Book('Animal Farm (1945)', 'George Orwell', 112, true));
addBookToLibrary(
	new Book(
		'The Hound of the Baskervilles',
		'Sir Arthur Conan Doyle',
		122,
		false
	)
);
addBookToLibrary(
	new Book('The Stranger', 'Albert Camus, tr. Matthew Ward', 123, true)
);
addBookToLibrary(new Book('The Hobbit', 'J.R.R. Tolkien', 295, false));
addBookToLibrary(
	new Book(
		'Some veery long book title. It keeps on going and going and going and going and going and going and going and going and going and here it ends',
		'Pablo Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso',
		1,
		false
	)
);
addBookToLibrary(new Book('A Single Man', 'Christopher Isherwood', 152, false));
addBookToLibrary(new Book('Ice', 'Anna Kavan', 158, false));
addBookToLibrary(
	new Book('Bonjour Tristesse', 'Françoise Sagan, tr. Irene Ash', 160, true)
);
addBookToLibrary(
	new Book('The Great Gatsby', 'F. Scott Fitzgerald', 189, false)
);
