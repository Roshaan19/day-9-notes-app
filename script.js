/* ==========================================
   DAY 9 - NOTES APP
   PART 3A
========================================== */

// ==========================
// SELECT ELEMENTS
// ==========================

const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");
const searchInput = document.getElementById("searchInput");
const notesContainer = document.getElementById("notesContainer");
const noteCount = document.getElementById("noteCount");

// ==========================
// VARIABLES
// ==========================

let notes = JSON.parse(localStorage.getItem("notes")) || [];

let editIndex = -1;

// ==========================
// SAVE TO LOCAL STORAGE
// ==========================

function saveToLocalStorage() {

    localStorage.setItem("notes", JSON.stringify(notes));

}

// ==========================
// UPDATE NOTE COUNTER
// ==========================

function updateCounter() {

    noteCount.textContent = notes.length;

}

// ==========================
// FORMAT DATE
// ==========================

function getCurrentDate() {

    const today = new Date();

    return today.toLocaleDateString("en-US", {

        day: "numeric",

        month: "short",

        year: "numeric"

    });

}

// ==========================
// DISPLAY EMPTY MESSAGE
// ==========================

function showEmptyState() {

    notesContainer.innerHTML = `

        <div class="empty-state">

            <i class="fa-solid fa-note-sticky"></i>

            <h3>No Notes Yet</h3>

            <p>Create your first note to get started.</p>

        </div>

    `;

}

// ==========================
// DISPLAY NOTES
// ==========================

function displayNotes(notesArray = notes) {

    notesContainer.innerHTML = "";

    if (notesArray.length === 0) {

        showEmptyState();

        updateCounter();

        return;

    }

    notesArray.forEach((note, index) => {

        const noteCard = document.createElement("div");

        noteCard.classList.add("note-card");

        noteCard.innerHTML = `

            <h3>${note.title}</h3>

            <p>${note.description}</p>

            <span class="note-date">

                ${note.date}

            </span>

            <div class="note-actions">

                <button
                    class="edit-btn"
                    onclick="editNote(${index})">

                    <i class="fa-solid fa-pen"></i>

                    Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteNote(${index})">

                    <i class="fa-solid fa-trash"></i>

                    Delete

                </button>

            </div>

        `;

        notesContainer.appendChild(noteCard);

    });

    updateCounter();

}

// ==========================
// INITIAL LOAD
// ==========================

displayNotes();

/* ==========================================
   DAY 9 - NOTES APP
   PART 3B
========================================== */

// ==========================
// CLEAR FORM
// ==========================

function clearForm() {

    titleInput.value = "";
    descriptionInput.value = "";

    editIndex = -1;

    saveBtn.innerHTML = `
        <i class="fa-solid fa-plus"></i>
        Save Note
    `;

    titleInput.focus();

}

// ==========================
// SAVE NOTE
// ==========================

function saveNote() {

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (title === "" || description === "") {

        alert("Please fill in both fields.");

        return;

    }

    const note = {

        title: title,

        description: description,

        date: getCurrentDate()

    };

    if (editIndex === -1) {

        notes.unshift(note);

    } else {

        notes[editIndex] = note;

        editIndex = -1;

        saveBtn.innerHTML = `
            <i class="fa-solid fa-plus"></i>
            Save Note
        `;

    }

    saveToLocalStorage();

    displayNotes();

    clearForm();

}

// ==========================
// EDIT NOTE
// ==========================

function editNote(index) {

    titleInput.value = notes[index].title;

    descriptionInput.value = notes[index].description;

    editIndex = index;

    saveBtn.innerHTML = `
        <i class="fa-solid fa-pen"></i>
        Update Note
    `;

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

// ==========================
// DELETE NOTE
// ==========================

function deleteNote(index) {

    const confirmDelete = confirm(

        "Delete this note?"

    );

    if (!confirmDelete) {

        return;

    }

    notes.splice(index,1);

    saveToLocalStorage();

    displayNotes();

}

// ==========================
// SEARCH NOTES
// ==========================

searchInput.addEventListener("input", function () {

    const keyword = this.value.toLowerCase();

    const filteredNotes = notes.filter(function(note){

        return note.title.toLowerCase().includes(keyword) ||

               note.description.toLowerCase().includes(keyword);

    });

    displayNotes(filteredNotes);

});

// ==========================
// BUTTON EVENTS
// ==========================

saveBtn.addEventListener("click", saveNote);

clearBtn.addEventListener("click", clearForm);

// ==========================
// DISPLAY SAVED NOTES
// ==========================

displayNotes();