const testButton = document.querySelector(
	"article > section:first-of-type button"
)
const clueText = document.querySelectorAll("article > section:first-of-type p")
let paragraphID = 0

console.log(paragraphID)

testButton.addEventListener("click", () => {
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
			.querySelector("article > section:first-of-type img:first-of-type")
			.classList.add("hidden")
		document
			.querySelector("article > section:first-of-type img:last-of-type")
			.classList.remove("hidden")
	} else {
		return
	}
	console.log(paragraphID)
})

// Function to handle drag start event
function dragStart(event) {
	event.dataTransfer.setData("text", event.target.id)
}
