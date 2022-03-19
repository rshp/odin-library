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
	bookCard.querySelector('.card-mark-read').addEventListener('click', () => {
		toggleBookRead(bookCard, book);
	});
	bookCard.querySelector('.card-delete').addEventListener('click', () => {
		removeBookCard(bookCard);
	});
}

function removeBookCard(bookCard) {
	bookCard.remove();
}

function toggleBookRead(bookCard, book) {
	book.toggleRead();
	bookCard.querySelector('.card-mark-read').classList.toggle('book-read');
}

function removeAllCards(targetHTML) {
	let removeCollection = [];
	for (const element of targetHTML.children) {
		let isBluePrint = Array.from(element.classList).includes(
			'blueprint-card'
		);
		let isAddBookButton = Array.from(element.classList).includes(
			'add-book-button'
		);
		if (!(isBluePrint || isAddBookButton)) removeCollection.push(element);
	}
	removeCollection.forEach((element) => {
		element.remove();
	});
}

function markAllRead(targetHTML) {
	for (const element of targetHTML.children) {
		let isBluePrint = Array.from(element.classList).includes(
			'blueprint-card'
		);
		let isAddBookButton = Array.from(element.classList).includes(
			'add-book-button'
		);
		if (!(isBluePrint || isAddBookButton)) {
			element.querySelector('.card-mark-read').classList.add('book-read');
		}
		//status change on object itself is missing
	}
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

const markAllReadButton = document.querySelector('#mark-read');
markAllReadButton.addEventListener('click', () => {
	markAllRead(libraryContainer);
});

const removeAllButton = document.querySelector('#clear-all');
removeAllButton.addEventListener('click', () => {
	removeAllCards(libraryContainer);
});

let modalWrapper = document.querySelector('.modal-wrapper');
let addBookButton = document.querySelectorAll('.add-book-button');

addBookButton.forEach((element) => {
	element.addEventListener('click', openAddBookWindow);
});

function openAddBookWindow() {
	modalWrapper.style.display = 'Block';
}

window.addEventListener('click', closeAddBookWindow);
function closeAddBookWindow(e) {
	if (e.target == modalWrapper) {
		//If clicked outside of popup, action is canceled
		modalWrapper.style.display = 'none';
	}
	if (e.target == document.querySelector('.modal-add-book-button')) {
		let bookTitle = modalWrapper.querySelector('#title').value;
		let bookAuthor = modalWrapper.querySelector('#author').value;
		let bookPages = modalWrapper.querySelector('#pages').value;
		let bookRead = modalWrapper.querySelector('#read').checked;
		addBookToLibrary(new Book(bookTitle, bookAuthor, bookPages, bookRead));
		modalWrapper.style.display = 'none';
	}
}
