// /////////////
// TUTORIAL
// /////////////

// Click the button to hide the zero state tutorial pop-up
document
	.querySelector(
		"article > section:first-of-type > section:first-of-type button"
	)
	.addEventListener("click", () => {
		document
			.querySelector("article > section:first-of-type > section:first-of-type")
			.classList.add("hidden")
	})

// /////////////
// NAVIGATION
// /////////////

// VARIABLES
const navButtons = document.querySelectorAll(
	"article > section:nth-of-type(2) section button"
)
const timelineLi = document.querySelectorAll(
	"article > section:nth-of-type(2) ul li"
)
// let is used here so the variable can be changed throughout use of the website
let currentIndex = 0

// Only when the current li is showing (the index being equal to currentindex), give it the class active
function showCurrentLi() {
	timelineLi.forEach((li, index) => {
		if (index == currentIndex && !li.classList.contains("hidden")) {
			li.classList.add("active")
		} else {
			li.classList.remove("active")
		}
	})
}

navButtons[0].addEventListener("click", () => {
	// example math to understand the logic:
	// currentindex = 2, timelineLi.length = 3:
	// 2 - 1 + 3 = 4
	// 4 % 3 = 1, because 1 is remaining
	currentIndex = (currentIndex - 1 + timelineLi.length) % timelineLi.length

	tableImages.forEach((img) => {
		img.classList.remove("hidden")
	})
	shelfImages.forEach((img) => {
		img.classList.remove("hidden")
	})

	showCurrentLi()
})

navButtons[1].addEventListener("click", () => {
	currentIndex = (currentIndex + 1) % timelineLi.length

	tableImages.forEach((img) => {
		img.classList.remove("hidden")
	})
	shelfImages.forEach((img, index) => {
		if (index !== 7) {
			img.classList.remove("hidden")
		}
	})

	showCurrentLi()
})

// initiate the function upon load to load the first li
showCurrentLi()

// /////////////
// DRAG AND DROP
// /////////////

// VARIABLES
const targetImage = document.querySelectorAll(
	"article > section:nth-of-type(2) li img"
)
const tableImages = document.querySelectorAll(
	"article > section:nth-of-type(3) img"
)
const shelfImages = document.querySelectorAll(
	"article > section:last-of-type img"
)
let draggedImage

function dragStart(event) {
	draggedImage = event.target
}

// Allow an item to be dropped at a certain place
// (gets specified at change clue text section of the code)
function allowDrop(event) {
	event.preventDefault()
}

// /////////////
// DATABASE
// /////////////

const clueData = {
	0: {
		firstImage: tableImages[1],
		secondImage: shelfImages[3],
		thirdImage: tableImages[0],
		clueParagraph: document.querySelectorAll(
			"article > section:nth-of-type(2) li:first-of-type p:not(:first-of-type)"
		),
		text: [
			"It was a demon, he talked with them to save Sam's live.",
			"The year has happed. Time is up. Dean gets ripped to shreds by the demon's helper.",
		],
	},
	1: {
		firstImage: shelfImages[2],
		secondImage: tableImages[1],
		thirdImage: shelfImages[6],
		clueParagraph: document.querySelectorAll(
			"article > section:nth-of-type(2) li:nth-of-type(2) p:not(:first-of-type)"
		),
		text: [
			"Sam and Dean caused Lucifer to rise. What does he rule?",
			"The other hunters are angry at Sam and Dean for starting the Apocalypse. They take matters into their own hands.",
		],
	},
	2: {
		firstImage: tableImages[3],
		secondImage: shelfImages[2],
		thirdImage: tableImages[1],
		clueParagraph: document.querySelectorAll(
			"article > section:nth-of-type(2) li:nth-of-type(3) p:not(:first-of-type)"
		),
		text: [
			"With the First Blade, Dean hopes to be able to kill the enemy.",
			"Dean dies at the hand of Metatron, but something unexpected happens.",
		],
	},
	3: {
		firstImage: shelfImages[0],
		secondImage: shelfImages[4],
		thirdImage: tableImages[2],
		clueParagraph: document.querySelectorAll(
			"article > section:nth-of-type(2) li:nth-of-type(4) p:not(:first-of-type)"
		),
		text: [
			"Dean decides he needs to try to talk to someone about Sam's death.",
			"To talk to Billie, also known as Death, Dean needs to die.",
		],
	},
	4: {
		firstImage: shelfImages[0],
		secondImage: shelfImages[3],
		thirdImage: shelfImages[4],
		clueParagraph: document.querySelectorAll(
			"article > section:nth-of-type(2) li:nth-of-type(5) p:not(:first-of-type)"
		),
		text: [
			"Dean and Sam have no way of escape, they need to take drastic measures.",
			"To escape the facility Dean makes a deal to have the brothers die and be brought back one more time, but at midnight one will be dying permanently.",
		],
	},
	5: {
		firstImage: tableImages[2],
		secondImage: shelfImages[5],
		thirdImage: shelfImages[4],
		clueParagraph: document.querySelectorAll(
			"article > section:nth-of-type(2) li:nth-of-type(6) p:not(:first-of-type)"
		),
		text: [
			"Dean grabs the syringes, Sam protests against this idea. What do the syringes do?",
			"Sam tries to start Dean's heart again with the other syringe, but someone else wishes to talk to Dean.",
		],
	},
	6: {
		firstImage: shelfImages[1],
		secondImage: shelfImages[2],
		thirdImage: shelfImages[4],
		clueParagraph: document.querySelectorAll(
			"article > section:nth-of-type(2) li:nth-of-type(7) p:not(:first-of-type)"
		),
		text: [
			"Dean gets pushed against a certain object. What does it look similar to?",
			"It's the last season. It is final.",
		],
	},
}

// /////////////
// CHANGE CLUE TEXT
// /////////////

let paragraphIndex = 0

function drop(event) {
	event.preventDefault()

	// If the mystery spot cube gets sacrificed, it unlocks the easter egg
	if (draggedImage == shelfImages[7]) {
		document
			.querySelector("article > section:first-of-type > section:nth-of-type(2)")
			.classList.remove("hidden")
		liElements[7].classList.remove("hidden")
	}

	// If any target image is the same as the event target, then it can reveal a clue
	if (Array.from(targetImage).includes(event.target)) {
		revealClues(event)
	} else {
		return
	}
}

function revealClues(event) {
	// For better comprehension of the code
	let currentClue = clueData[currentIndex]

	if (paragraphIndex == 0 && draggedImage == currentClue.firstImage) {
		currentClue.clueParagraph[1].textContent = currentClue.text[0]

		// Spin animation when sacrifice is succesful
		targetImage[currentIndex].classList.add("spin")
		draggedImage.classList.add("hidden")

		// Stop animation when finished
		setTimeout(() => {
			targetImage[currentIndex].classList.remove("spin")
		}, 1000)

		// If the first clue gets revealed,
		// increase the paragraphIndex so that more text can be
		// revealed upon the next button press
		paragraphIndex++
	} else if (paragraphIndex == 1 && draggedImage == currentClue.secondImage) {
		currentClue.clueParagraph[2].textContent = currentClue.text[1]

		targetImage[currentIndex].classList.add("spin")
		draggedImage.classList.add("hidden")

		setTimeout(() => {
			targetImage[currentIndex].classList.remove("spin")
		}, 1000)

		paragraphIndex++
	} else if (paragraphIndex == 2 && draggedImage == currentClue.thirdImage) {
		targetImage[currentIndex].classList.add("spin")
		draggedImage.classList.add("hidden")

		finalAnimation()

		paragraphIndex = 0
	} else {
		return
	}
}

// /////////////
// ANIMATION
// /////////////

function finalAnimation() {
	setTimeout(() => {
		targetImage[currentIndex].classList.add("disappear")
	}, 1000)

	setTimeout(() => {
		timelineLi[currentIndex].querySelector("video").classList.remove("hidden")
		timelineLi[currentIndex].querySelector("video").classList.add("appear")
	}, 2000)

	setTimeout(() => {
		targetImage[currentIndex].classList.remove("spin", "disappear")
		targetImage[currentIndex].classList.add("hidden")
		timelineLi[currentIndex].querySelector("video").classList.remove("appear")
	}, 3000)

	// Easter egg
	if (
		currentIndex == 5 &&
		paragraphIndex == 2 &&
		draggedImage == currentClue.thirdImage
	) {
		setTimeout(() => {
			shelfImages[7].classList.remove("hidden")
		}, 3000)
	}
}
