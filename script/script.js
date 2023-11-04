const testButton = document.querySelector(
	"article > section:first-of-type button:last-of-type"
)
const clueText = document.querySelectorAll(
	"article > section:first-of-type li:first-of-type p"
)
let paragraphID = 0

// console.log(paragraphID)

// Function to handle drag start event
function dragStart(event) {
	event.dataTransfer.setData("text", event.target.id)
}

// Add this JavaScript code to your script.js file

const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")
const liElements = document.querySelectorAll(
	"article > section:first-of-type ul li"
)
let currentIndex = 0

function showCurrentLi() {
	liElements.forEach((li, index) => {
		if (index === currentIndex) {
			li.classList.add("active")
		} else {
			li.classList.remove("active")
		}
	})
}

prevBtn.addEventListener("click", () => {
	currentIndex = (currentIndex - 1 + liElements.length) % liElements.length
	showCurrentLi()
})

nextBtn.addEventListener("click", () => {
	currentIndex = (currentIndex + 1) % liElements.length
	showCurrentLi()
})

// Initially, show the first li element
showCurrentLi()

testButton.addEventListener("click", () => {
	if (currentIndex == 0) {
		if (paragraphID == 0) {
			clueText[0].textContent =
				"Dean and Sam Winchester were on a new case. Someone disappeared in a most curious Spot."

			paragraphID++
		} else if (paragraphID == 1) {
			clueText[1].textContent =
				"They decide to investigate at night, but suddenly got interrupted."

			paragraphID++
		} else if (paragraphID == 2) {
			clueText[2].textContent =
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
		// console.log(paragraphID)
	}
})
