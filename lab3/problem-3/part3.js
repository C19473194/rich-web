/**
 * This function initializes the application when the DOM is fully loaded.
 * It creates instances of the Note class for managing notes.
 * The application allows users to create, edit, and delete notes, as well as add subnotes.
 * RxJS is used for handling asynchronous events and streams.
 *
 * @event DOMContentLoaded - The event triggered when the HTML document has been completely loaded and parsed.
 */
document.addEventListener("DOMContentLoaded", function () {
  const colorSelect = document.getElementById("colorSelect");
  const newNote = document.getElementById("newNote");
  const addNoteBtn = document.getElementById("addNoteBtn");
  const noteContainer = document.getElementById("noteContainer");

  class Note {
    constructor(text, color, parent = null) {
      this.text = text;
      this.color = color;
      this.parent = parent;
      this.children = [];
      this.domElement = this.createNoteElement();
    }
	  /**
     * Creates the HTML representation of a note and returns the corresponding DOM element.
     *
     * @returns {HTMLElement} - The DOM element representing the note.
     */
    createNoteElement() {
      const noteDiv = document.createElement("div");
      noteDiv.className = "note";
      noteDiv.style.backgroundColor = this.color;
      noteDiv.innerHTML = `<textarea readonly>${this.text}</textarea>
                           <button class="editBtn">Edit</button>
                           <button class="deleteBtn">Delete</button>
                           <button class="addChildBtn">Add Subnote</button>`;
      return noteDiv;
    }
	/**
     * Adds a child note to the current note's children array.
     *
     * @param {Note} childNote - The child note to be added.
     */
    addChild(childNote) {
      this.children.push(childNote);
    }
  }
	// Array to store top-level notes
  let topLevelNotes = [];
   // Subjects for handling delete and add child events
  const deleteNoteSubject = new rxjs.Subject();
  const addChildNoteStream = new rxjs.Subject();
	 // Subscribe to the addChildNoteStream to handle adding child notes
  addChildNoteStream.subscribe(parentNoteInstance => addChildNote(parentNoteInstance));
	 // RxJS stream for handling "Add Note" button clicks
  const addNote$ = rxjs.fromEvent(addNoteBtn, "click");
  addNote$.subscribe(() => addNote());
/**
* Function to handle adding a new note to the UI and the application's data structure.
* Retrieves the selected color and text input, creates a new note, and sets up interactions.
* Only adds the note if the text input is not empty.
*/
  const addNote = () => {
    const selectedColor = colorSelect.value;
    const newNoteText = newNote.value.trim();

    if (newNoteText !== "") {
      const newNoteInstance = new Note(newNoteText, selectedColor);
      topLevelNotes.push(newNoteInstance);
      noteContainer.appendChild(newNoteInstance.domElement);
      newNote.value = "";
      setupNoteInteractions(newNoteInstance);
    } else {
      alert("Please enter text to add a note.");
    }
  };
	/**
	* Sets up event interactions for a given note, such as editing, deleting, and adding subnotes.
	*
	* @param {Note} noteInstance - The note instance for which interactions are being set up.
	*/
  const setupNoteInteractions = (noteInstance) => {
    const editBtn = noteInstance.domElement.querySelector(".editBtn");
    const deleteBtn = noteInstance.domElement.querySelector(".deleteBtn");
    const addChildBtn = noteInstance.domElement.querySelector(".addChildBtn");
	 // RxJS streams for various interaction
    const editClick$ = rxjs.fromEvent(editBtn, "click");
    const deleteClick$ = rxjs.fromEvent(deleteBtn, "click");
    const addChildClick$ = rxjs.fromEvent(addChildBtn, "click");

    editClick$.subscribe(() => editNote(noteInstance));
    deleteClick$.subscribe(() => deleteNoteAndChildren(noteInstance));
    addChildClick$.subscribe(() => addChildNoteStream.next(noteInstance));

    // Only show "Add Subnote" button for top-level notes
    if (noteInstance.parent === null) {
      addChildBtn.style.display = "inline-block";
    } else {
      // Hide the "Add Subnote" button for non-top-level notes
      addChildBtn.style.display = "none";
    }
  };
	/**
   * Handles editing a note by toggling the readonly attribute of the note's textarea.
   *
   * @param {Note} noteInstance - The note instance being edited.
   */
  const editNote = (noteInstance) => {
    const textarea = noteInstance.domElement.querySelector("textarea");
    const editBtn = noteInstance.domElement.querySelector(".editBtn");

    const isReadonly = textarea.hasAttribute("readonly");
    if (isReadonly) {
      textarea.removeAttribute("readonly");
      textarea.focus();
      editBtn.innerHTML = "Save";
    } else {
      textarea.setAttribute("readonly", true);
      editBtn.innerHTML = "Edit";
    }
  };
	/**
   * Recursively creates a stream for deleting a note and its children.
   *
   * @param {Note} note - The note instance to be deleted.
   * @returns {Observable} - An RxJS observable representing the deletion stream.
   */
  const createDeleteNoteStream = (note) => {
    const childDeletion$ = rxjs.from(note.children).pipe(
      rxjs.operators.mergeMap(child => createDeleteNoteStream(child))
    );

    return rxjs.concat(childDeletion$, rxjs.of(note));
  };

  /**
   * Handles deleting a note and its children from the UI and the application's data structure.
   *
   * @param {Note} noteInstance - The note instance to be deleted.
   */
  const deleteNoteAndChildren = (noteInstance) => {
    createDeleteNoteStream(noteInstance).subscribe(deletedNote => {
      const parentNote = deletedNote.parent;
      if (parentNote) {
        parentNote.children = parentNote.children.filter(child => child !== deletedNote);
      } else {
        topLevelNotes = topLevelNotes.filter(topNote => topNote !== deletedNote);
      }

      noteContainer.removeChild(deletedNote.domElement);
    });

    // Notify subscribers about the deletion
    deleteNoteSubject.next(noteInstance);
  };

  /**
   * Handles adding a child note to the UI and the application's data structure.
   * Ensures that only parent notes can have child notes and checks if the parent is a top-level note.
   *
   * @param {Note} parentNoteInstance - The parent note instance to which the child note will be added.
   */
  const addChildNote = (parentNoteInstance) => {
    // Ensure that only parent notes can have child notes
    // Check if the parent note is a top-level note
    if (!parentNoteInstance.parent) {
      const selectedColor = parentNoteInstance.color; // Inherit color from parent
      const newNoteText = "Add Subnote";

      const childNoteInstance = new Note(newNoteText, selectedColor, parentNoteInstance);
      parentNoteInstance.addChild(childNoteInstance);
      childNoteInstance.domElement.classList.add("child");
      noteContainer.appendChild(childNoteInstance.domElement);
      setupNoteInteractions(childNoteInstance);
    }
  };

});
