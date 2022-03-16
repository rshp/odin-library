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
