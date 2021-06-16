class Flashcard {
	constructor(index) {
		this.index = index;

		const flashcards = document.getElementById('flashcards');

		this.wrapper = document.createElement('div');
		this.wrapper.setAttribute('class', 'flashcard');

		this.frontEditor = this.addSurface();

		this.backEditor = this.addSurface();

		const deleteLink = document.createElement('a');
		deleteLink.setAttribute('href', 'javascript:;');
		deleteLink.setAttribute('class', 'button del');
		deleteLink.onclick = this.delete.bind(this);

		const deleteIcon = document.createElement('i');
		deleteIcon.setAttribute('class', 'fas fa-trash fa-2x');

		deleteLink.appendChild(deleteIcon);
		this.wrapper.appendChild(deleteLink);

		flashcards.appendChild(this.wrapper);
	}

	addSurface() {
		let container = document.createElement('div');
		container.setAttribute('class', 'container');

		this.wrapper.appendChild(container);

		return new Quill(container, {
			modules: {
				toolbar: [
					[{ "size": ["small", false, "large", "huge"] }],
		
					["bold", "italic", "underline", "strike"],
		
					[{ "header": 1 }, { "header": 2 }],
		
					[{ "list": "ordered" }, { "list": "bullet" }],
		
					[{ "align": [] }],
		
					["clean"]
				]
			},
			theme: "bubble"
		});
	}

	delete() {
		this.wrapper.remove();
		gFlashcards.removeCard(this.index);
	}
}

class FlashcardSet {
	constructor() {
		this.cards = [];
		this.addCard();
	}
	addCard() {
		this.cards.push(new Flashcard(this.cards.length));
	}
	removeCard(index) {
		this.cards.splice(index, 1);
	}
}

const gFlashcards = new FlashcardSet();

function AddCard()
{
	gFlashcards.addCard();
	window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
}

function GetPrintHtml()
{
	let ret = `
		<!doctype html>
		<head>
	  		<meta charset="utf-8">
			<style>
				* {
					box-sizing: border-box; 
				}

				@page {
					margin: 0;
					background: white;
				}
				
				body {
					margin: 0;
				}

				.container {
					width: 10in;
					height: 6in;
					margin-left: 0.5in;
					margin-top: 1.25in;
					overflor: hidden;
					display: flex;
					flex-wrap: wrap;
					page-break-after: always;
				}

				p {
					margin: 0;
				}

				.ql-align-center {
					text-align: center;
				}

				.ql-size-large {
					font-size: 1.5em;
				}

				ul {
					list-style-position: inside;
				}
				
				.flashcard {
					width: 50%;
					height: 3in;
					background: white;
					border: 1px solid black;
					padding: 12px 15px;
					font-family: Helvetica, Arial, sans-serif;
					font-size: 13px;
					tab-size: 4;
					white-space: pre;
				}

				.pagebreak {
					page-break-before: always;
					margin-bottom: 0.5in;
				}
			</style>
		</head>
	
		<body>
	`;

	let nSets = Math.ceil(gFlashcards.cards.length / 4);

	for (let set = 0; set < nSets; set++)
	{
		let startIndex = 4 * set;
		let nCards = Math.min(4, gFlashcards.cards.length - (4 * set));

		ret += '<div class="container">';
		for (let i = startIndex; i < startIndex + nCards; i++) {
			ret += '<div class="flashcard">' + gFlashcards.cards[i].frontEditor.root.innerHTML + '</div>\n';
		}
		ret += '</div>';

		ret += '<div class="container">';
		for (let i = startIndex; i < startIndex + nCards; i++) {
			ret += '<div class="flashcard">' + gFlashcards.cards[i].backEditor.root.innerHTML + '</div>\n';
		}
		ret += '</div>';
	}

	ret += '</body></html>'

	return ret;
}

function PrintCards()
{
	var newWin = window.open();
	newWin.document.write(GetPrintHtml());
}