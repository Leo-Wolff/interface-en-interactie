// VARIABLES
const navButtons = document.querySelectorAll(
	"article > section:first-of-type section button"
)
const liElements = document.querySelectorAll(
	"article > section:first-of-type ul li"
)
const testButton = document.querySelector("article > section:first-of-type a")
const firstLiClueText = document.querySelectorAll(
	"article > section:first-of-type li:first-of-type p:not(:first-of-type)"
)
// let is used here so the variable can be changed throughout use of the website
let paragraphID = 0
let currentIndex = 0

//
// NAVIGATION
//

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
// CHANGE CLUE TEXT
//

testButton.addEventListener("click", () => {
	// if the first li is being shown
	if (currentIndex == 0) {
		if (paragraphID == 0) {
			firstLiClueText[0].textContent =
				"Dean and Sam Winchester were on a new case. Someone disappeared in a most curious Spot."

			//if the first clue gets revealed, increase the paragraphID so that more text can be revealed upon the next button press
			paragraphID++
		} else if (paragraphID == 1) {
			firstLiClueText[1].textContent =
				"They decide to investigate at night, but suddenly got interrupted."

			paragraphID++
		} else if (paragraphID == 2) {
			firstLiClueText[2].textContent =
				"Dean dies and Sam is most upset. Until he wakes up, it is Tuesday again and Dean is alive."

			document
				.querySelector("article > section:first-of-type li:first-of-type img")
				.classList.add("hidden")
			document
				.querySelector("article > section:first-of-type li:first-of-type video")
				.classList.remove("hidden")
		} else {
			return
		}
	}
})

//
// DRAG AND DROP
//

function dragStart(event) {
	event.dataTransfer.setData("text", event.target.id)
}
