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
	trunkImages.forEach((img) => {
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
const trunkImages = document.querySelectorAll(
	"article > section:last-of-type section > section img:not(:first-of-type)"
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
		firstImage: tableImages[3],
		secondImage: trunkImages[0],
		thirdImage: shelfImages[2],
		clueParagraph: document.querySelectorAll(
			"article > section:first-of-type li:first-of-type p:not(:first-of-type)"
		),
		text: [
			"They decide to investigate at night, but suddenly got interrupted.",
			"Dean dies and Sam is most upset. Until he wakes up, it is Tuesday again and Dean is alive.",
		],
	},
	1: {
		firstImage: tableImages[3],
		secondImage: shelfImages[3],
		thirdImage: shelfImages[2],
		clueParagraph: document.querySelectorAll(
			"article > section:first-of-type li:nth-of-type(2) p:not(:first-of-type)"
		),
		text: [
			"Sam suggests this time to investigate during the day, but Dean doesn't watch the road.",
			"Dean dies for a second time. Then Sam wakes up, it is Tuesday for a third time and Dean is alive.",
		],
	},
}
let paragraphID = 0

// console.log(tableImages)
// console.log(shelfImages)
// console.log(trunkImages)

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

		draggedImage.classList.add("hidden")

		//if the first clue gets revealed, increase the paragraphID so that more text can be revealed upon the next button press
		paragraphID++
	} else if (paragraphID == 1 && draggedImage == currentClue.secondImage) {
		currentClue.clueParagraph[2].textContent = currentClue.text[1]

		draggedImage.classList.add("hidden")

		paragraphID++
	} else if (paragraphID == 2 && draggedImage == currentClue.thirdImage) {
		draggedImage.classList.add("hidden")

		targetImage[currentIndex].classList.add("hidden")
		liElements[currentIndex].querySelector("video").classList.remove("hidden")

		paragraphID = 0
	} else {
		return
	}
}
