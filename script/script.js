//
// NAVIGATION
//

const navButtons = document.querySelectorAll(
	"article > section:first-of-type section button"
)
const liElements = document.querySelectorAll(
	"article > section:first-of-type ul li"
)
// let is used here so the variable can be changed throughout use of the website
let currentIndex = 0

function showCurrentLi() {
	liElements.forEach((li, index) => {
		if (index == currentIndex) {
			// add a class to the current li
			li.classList.add("active")
		} else {
			li.classList.remove("active")
		}
	})
}

navButtons[0].addEventListener("click", () => {
	// go to the previous li, if there is no more elements to go back to, wrap back around
	currentIndex = (currentIndex - 1) % liElements.length

	tableImages.forEach((img) => {
		img.classList.remove("hidden")
	})
	shelfImages.forEach((img) => {
		img.classList.remove("hidden")
	})
	trunkImages.forEach((img) => {
		img.classList.remove("hidden")
	})

	showCurrentLi()
})

navButtons[1].addEventListener("click", () => {
	// go to the next li, if there is no more elements to go forward to, wrap back around
	currentIndex = (currentIndex + 1) % liElements.length

	tableImages.forEach((img) => {
		img.classList.remove("hidden")
	})
	shelfImages.forEach((img) => {
		img.classList.remove("hidden")
	})

	showCurrentLi()
})

// initiate the function upon load to load the first li
showCurrentLi()

//
// DRAG AND DROP
//
const targetImage = document.querySelectorAll(
	"article > section:first-of-type li img"
)
const tableImages = document.querySelectorAll(
	"article > section:nth-of-type(2) img"
)
const shelfImages = document.querySelectorAll(
	"article > section:last-of-type img"
)
let draggedImage

function dragStart(event) {
	draggedImage = event.target
}

function allowDrop(event) {
	event.preventDefault()
}

//
// CHANGE CLUE TEXT
//
// This object has all of the different information that is needed for each specific item in the timeline
const clueData = {
	0: {
		firstImage: tableImages[1],
		secondImage: shelfImages[3],
		thirdImage: tableImages[0],
		clueParagraph: document.querySelectorAll(
			"article > section:first-of-type li:first-of-type p:not(:first-of-type)"
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
			"article > section:first-of-type li:nth-of-type(2) p:not(:first-of-type)"
		),
		text: [
			"Sam and Dean caused Lucifer to rise. What does he rule?",
			"The other hunters are angry at Sam and Dean for starting the Apocalypse. They take matters into their own hands.",
		],
	},
}
let paragraphID = 0

console.log(tableImages)
console.log(shelfImages)

function drop(event) {
	event.preventDefault()

	if (Array.from(targetImage).includes(event.target)) {
		revealClues(event)
	} else {
		return
	}
}

function revealClues(event) {
	let currentClue = clueData[currentIndex]

	if (paragraphID == 0 && draggedImage == currentClue.firstImage) {
		currentClue.clueParagraph[1].textContent = currentClue.text[0]

		targetImage[currentIndex].classList.add("spin")
		draggedImage.classList.add("hidden")

		setTimeout(function () {
			targetImage[currentIndex].classList.remove("spin")
		}, 1000)

		//if the first clue gets revealed, increase the paragraphID so that more text can be revealed upon the next button press
		paragraphID++
	} else if (paragraphID == 1 && draggedImage == currentClue.secondImage) {
		currentClue.clueParagraph[2].textContent = currentClue.text[1]

		targetImage[currentIndex].classList.add("spin")
		draggedImage.classList.add("hidden")

		setTimeout(function () {
			targetImage[currentIndex].classList.remove("spin")
		}, 1000)

		paragraphID++
	} else if (paragraphID == 2 && draggedImage == currentClue.thirdImage) {
		targetImage[currentIndex].classList.add("spin")
		draggedImage.classList.add("hidden")

		setTimeout(function () {
			targetImage[currentIndex].classList.add("disappear")
		}, 1000)

		setTimeout(function () {
			liElements[currentIndex].querySelector("video").classList.remove("hidden")
			liElements[currentIndex].querySelector("video").classList.add("appear")
		}, 2000)

		setTimeout(function () {
			targetImage[currentIndex].classList.remove("spin", "disappear")
			targetImage[currentIndex].classList.add("hidden")
			liElements[currentIndex].querySelector("video").classList.remove("appear")
		}, 3000)

		paragraphID = 0
	} else {
		return
	}
}
