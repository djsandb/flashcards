class Flashcard {
	constructor() {
		const flashcards = document.getElementById('flashcards');

		this.wrapper = document.createElement('div');
		this.wrapper.setAttribute('class', 'flashcard');

		this.frontEditor = this.addSurface();

		this.backEditor = this.addSurface();

		flashcards.appendChild(this.wrapper);
	}

	addSurface() {
		let container = document.createElement('div');
		container.setAttribute('class', 'container');

		this.wrapper.appendChild(container);

		return new Quill(container, {
			theme: 'bubble'
		});
	}
}

class FlashcardSet {
	constructor() {
		this.cards = [];
		this.addCard();
	}
	addCard() {
		this.cards.push(new Flashcard());
	}
}

const gFlashcards = new FlashcardSet();
