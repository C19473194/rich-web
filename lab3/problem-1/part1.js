document.addEventListener("DOMContentLoaded", function () {
	
	const colorSelect = document.getElementById("colorSelect");
	const newNote = document.getElementById("newNote");
	const addNoteBtn = document.getElementById("addNoteBtn");
	const noteContainer = document.getElementById("noteContainer");

	const addNote$ = rxjs.fromEvent(addNoteBtn, "click");
	addNote$.subscribe(() => addNote());

	// Function to add a new note
	const addNote = () => {
		// Get the selected color and trimmed text from the input fields
		const selectedColor = colorSelect.value;
		const newNoteText = newNote.value.trim();

		// Check if the new note text is not empty
		if (newNoteText !== "") {
			// Create a new div element for the note
			const noteDiv = document.createElement("div");
			noteDiv.className = "note";
			noteDiv.style.backgroundColor = selectedColor;

			// Set the inner HTML of the note div
			noteDiv.innerHTML = `<textarea readonly>${newNoteText}</textarea>
								 <button class="editBtn">Edit</button>
								 <button class="deleteBtn">Delete</button>`;

			// Append the note div to the noteContainer
			noteContainer.appendChild(noteDiv);

			// Clear the input field
			newNote.value = "";

			// Get the edit and delete buttons within the note div
			const editBtn = noteDiv.querySelector(".editBtn");
			const deleteBtn = noteDiv.querySelector(".deleteBtn");

			// Create observables for the edit and delete button clicks using RxJS
			const editClick$ = rxjs.fromEvent(editBtn, "click");
			const deleteClick$ = rxjs.fromEvent(deleteBtn, "click");

			// Subscribe to the observables and call the corresponding functions
			editClick$.subscribe(() => editNote(editBtn));
			deleteClick$.subscribe(() => deleteNote(deleteBtn));
		} else {
			// Display a message if no text is entered
			alert("Please enter text to add a note.");
		}
	};

	
	// Create an observable for the "Edit" button clicks
	const editButtonClick$ = new rxjs.Subject();

	// Function to handle editing a note
	const editNote = (button) => {
		// Get the textarea associated with the button
		const textarea = button.previousElementSibling;

		// Toggle between readonly and editable states
		const isReadonly = textarea.hasAttribute("readonly");
		if (isReadonly) {
			// Enable editing by removing the readonly attribute
			textarea.removeAttribute("readonly");

			// Focus on the textarea for user convenience
			textarea.focus();

			// Change the button text to "Save"
			button.innerHTML = "Save";

			// Emit the "Edit" button click event using RxJS
			editButtonClick$.next(button);
		}
	};

	// Subscribe to the "Edit" button clicks
	editButtonClick$.subscribe((button) => {
		// Create an observable for the "Save" button clicks
		const saveClick$ = rxjs.fromEvent(button, "click");

		// Subscribe to the "Save" button clicks
		const saveSubscription = saveClick$.subscribe(() => {
			const textarea = button.previousElementSibling;
			textarea.setAttribute("readonly", true);
			button.innerHTML = "Edit";
		});

		// Unsubscribe to avoid memory leaks
		const editSubscription = editButtonClick$.subscribe(() => {
			saveSubscription.unsubscribe();
			editSubscription.unsubscribe();
		});
	});

	// Function to delete a note
	const deleteNote = (button) => {
		// Get the parent element of the button, which is the note's container
		const noteDiv = button.parentElement;

		// Remove the note's container from the noteContainer
		noteContainer.removeChild(noteDiv);
	};

						

	
    });
	  