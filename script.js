class library {
	constructor(libraryContainer) {
		this.books = [];
		this.libraryContainer = libraryContainer;
		this.#createAddBookButton();
	}
	addBook(book) {
		if (!this.#isInLibrary(book)) this.books.push(book);
		const bookCard = this.#createBookCard(book);
		this.#attachBookCard(bookCard);
	}
	#createAddBookButton() {
		const button = document.createElement('div');
		button.classList.add('book-card', 'add-book-button');
		this.libraryContainer.appendChild(button);
	}

	#isInLibrary(book) {
		return this.books.some((element) => element.title == book.title);
	}
	removeBook(book) {
		this.books = this.books.filter(
			(element) => element.title != book.title
		);
	}

	removeAll() {
		this.libraryContainer
			.querySelectorAll('.card-delete')
			.forEach((element) => {
				element.click();
			});
	}

	markAllRead() {
		this.books.forEach((book) => {
			if (!book.read) book.toggleRead();
		});
		this.libraryContainer
			.querySelectorAll('.card-mark-read')
			.forEach((element) => {
				element.classList.add('book-read');
			});
	}

	#selectBook(book) {
		return this.books.find((element) => element.title == book.title);
	}
	toggleRead(book) {
		this.#selectBook(book).toggleRead();
	}
	#createBookCard(book) {
		const bookCard = document.createElement('div');
		bookCard.classList.add('book-card');
		bookCard.innerHTML = `
		<p class="book-title"></p>
		<div class="separator">
			<div class="line"></div>
			<span>by</span>
		</div>
		<p class="author"></p>
		<div class="separator">
			<div class="line"></div>
			<p><br /></p>
		</div>
		<p class="book-pages"></p>
		<div class="card-controls">
			<div class="card-mark-read">
				<img src="./icon/text-box-check-outline.svg" alt="" />
			</div>
			<div class="card-delete">
				<img src="./icon/delete-outline.svg" alt="" />
			</div>
		</div>`;
		bookCard.querySelector('.author').innerHTML = book.author;
		bookCard.querySelector('.book-title').innerHTML = book.title;
		bookCard.querySelector('.book-pages').innerHTML = `${book.pages} pages`;
		if (book.read)
			bookCard
				.querySelector('.card-mark-read')
				.classList.add('book-read');
		bookCard
			.querySelector('.card-mark-read')
			.addEventListener('click', () => {
				this.toggleRead(book);
				bookCard
					.querySelector('.card-mark-read')
					.classList.toggle('book-read');
			});
		bookCard.querySelector('.card-delete').addEventListener('click', () => {
			this.removeBook(book);
			bookCard.remove();
		});
		return bookCard;
	}
	#attachBookCard(bookCard) {
		this.libraryContainer.insertBefore(
			bookCard,
			this.libraryContainer.lastElementChild
		);
	}
}

class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}

	toggleRead() {
		this.read = !this.read;
	}
}

const libContainer = document.querySelector('.library');
myLibrary = new library(libContainer);

const markAllReadButton = document.querySelector('#mark-read');
markAllReadButton.addEventListener('click', () => {
	myLibrary.markAllRead();
});

const removeAllButton = document.querySelector('#clear-all');
removeAllButton.addEventListener('click', () => {
	myLibrary.removeAll();
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
		myLibrary.addBook(new Book(bookTitle, bookAuthor, bookPages, bookRead));
		modalWrapper.style.display = 'none';
		[
			modalWrapper.querySelector('#title').value,
			modalWrapper.querySelector('#author').value,
			modalWrapper.querySelector('#pages').value,
			modalWrapper.querySelector('#read').checked,
		] = Array(4).fill('');
	}
}

//Add some existing books to collection
myLibrary.addBook(new Book('Animal Farm (1945)', 'George Orwell', 112, true));
myLibrary.addBook(
	new Book(
		'The Hound of the Baskervilles',
		'Sir Arthur Conan Doyle',
		122,
		false
	)
);
myLibrary.addBook(
	new Book('The Stranger', 'Albert Camus, tr. Matthew Ward', 123, true)
);
myLibrary.addBook(new Book('The Hobbit', 'J.R.R. Tolkien', 295, false));
myLibrary.addBook(
	new Book(
		'Some veery long book title. It keeps on going and going and going and going and going and going and going and going and going and here it ends',
		'Pablo Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso',
		1,
		false
	)
);
myLibrary.addBook(
	new Book('A Single Man', 'Christopher Isherwood', 152, false)
);
myLibrary.addBook(new Book('Ice', 'Anna Kavan', 158, false));
myLibrary.addBook(
	new Book('Bonjour Tristesse', 'Françoise Sagan, tr. Irene Ash', 160, true)
);
myLibrary.addBook(
	new Book('The Great Gatsby', 'F. Scott Fitzgerald', 189, false)
);
