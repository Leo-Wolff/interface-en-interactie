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
	showCurrentLi()
})

navButtons[1].addEventListener("click", () => {
	// go to the next li, if there is no more elements to go forward to, wrap back around
	currentIndex = (currentIndex + 1) % liElements.length
	showCurrentLi()
})

// initiate the function upon load to load the first li
showCurrentLi()

//
// DRAG AND DROP
//
const targetImage = document.querySelector(
	"article > section:first-of-type li:first-of-type img"
)
const tableImages = document.querySelectorAll(
	"article > section:nth-of-type(2) img"
)
const shelfImages = document.querySelectorAll(
	"article > section:last-of-type img"
)
const trunkImages = document.querySelectorAll(
	"article > section:last-of-type section > section img"
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
const firstLiClueText = document.querySelectorAll(
	"article > section:first-of-type li:first-of-type p:not(:first-of-type)"
)
let paragraphID = 0

function drop(event) {
	event.preventDefault()

	if (event.target == targetImage) {
		if (currentIndex == 0) {
			if (paragraphID == 0 && draggedImage == tableImages[0]) {
				firstLiClueText[0].textContent =
					"Dean and Sam Winchester were on a new case. Someone disappeared in a most curious Spot."

				draggedImage.classList.add("hidden")

				//if the first clue gets revealed, increase the paragraphID so that more text can be revealed upon the next button press
				paragraphID++
			} else if (paragraphID == 1 && draggedImage == shelfImages[0]) {
				firstLiClueText[1].textContent =
					"They decide to investigate at night, but suddenly got interrupted."

				draggedImage.classList.add("hidden")

				paragraphID++
			} else if (paragraphID == 2 && draggedImage == trunkImages[0]) {
				firstLiClueText[2].textContent =
					"Dean dies and Sam is most upset. Until he wakes up, it is Tuesday again and Dean is alive."

				draggedImage.classList.add("hidden")

				document
					.querySelector("article > section:first-of-type li:first-of-type img")
					.classList.add("hidden")
				document
					.querySelector(
						"article > section:first-of-type li:first-of-type video"
					)
					.classList.remove("hidden")
			} else {
				return
			}
		}
	}
}
