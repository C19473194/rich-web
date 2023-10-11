// Function to add a new note
function addNote() {
	const colorSelect = document.getElementById("colorSelect");
	const selectedColor = colorSelect.value;
	const newNoteText = document.getElementById("newNote").value.trim();
	
	if (newNoteText !== "") {
		const noteContainer = document.getElementById("noteContainer");
		const noteDiv = document.createElement("div");
		noteDiv.className = "note";
		noteDiv.style.backgroundColor = selectedColor;
		noteDiv.innerHTML = '<textarea readonly>' + newNoteText + '</textarea>' +
							'<button onclick="editNote(this)">Edit</button>' +
							'<button onclick="deleteNote(this)">Delete</button>';
		noteContainer.appendChild(noteDiv);
		
		// Clear the input field
		document.getElementById("newNote").value = "";
	}
}

// Function to edit a note
function editNote(button) {
	const textarea = button.previousElementSibling;
	textarea.removeAttribute("readonly");
	textarea.focus();
	button.innerHTML = "Save";
	button.onclick = function () {
		textarea.setAttribute("readonly", true);
		button.innerHTML = "Edit";
	};
}

// Function to delete a note
function deleteNote(button) {
	const noteDiv = button.parentElement;
	const noteContainer = document.getElementById("noteContainer");
	noteContainer.removeChild(noteDiv);
}