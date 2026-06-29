// hambuger menu toggle
const hamburger = document.querySelector(".hamburger-menu");
const sidebar = document.querySelector(".sidebar");

hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("closed");
});

// sidebar active button
const buttons = document.querySelectorAll(".sidebar-btn");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
});


// selecting elements for note taking
const addNote = document.querySelector(".add-note");
const inputWrapper = document.querySelector(".input-wrapper");
const expandedSection = document.querySelector(".expanded-section");

const addInput = document.querySelector(".add-input");
const titleInput = document.querySelector(".title-input");
const noteBody = document.querySelector(".note-body");

const closeBtn = document.querySelector(".close-btn");

const notesGrid = document.querySelector(".notes-grid");
// overlay/notes editing
const overlay = document.querySelector(".overlay");

// selecting bin
const trashBin = document.querySelector("#trash-btn");
const notesBtn = document.querySelector("#notes-btn");

// a counter for pinning function
let noteOrder = 0;

// storing active and deleted notes
const activeNotes = [];
const deletedNotes = [];


// expand when clicking the input
inputWrapper.addEventListener("click", () => {

    // expand the addNote area
    addNote.classList.add("expanded");

    inputWrapper.classList.add("hidden");
    expandedSection.classList.remove("hidden");

    noteBody.focus();
});


// collapse when close is pressed
closeBtn.addEventListener("click", () => {

    const title = titleInput.value;
    const body = noteBody.value;

    if (title !== "" || body !== "") {
        createNote(title, body);
    }

    titleInput.value = "";
    noteBody.value = "";

    addNote.classList.remove("expanded");

    expandedSection.classList.add("hidden");
    inputWrapper.classList.remove("hidden");


});

// for note autogrowing
function autoGrow(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
}


// creating notes function
function createNote(title, body) {

    const note = document.createElement("div");
    note.className = "note";

    // every note will have its own order
    note.dataset.order = noteOrder;
    noteOrder++;

    note.innerHTML = `
    <div class="note-header">
        <textarea class="note-title" readonly>${title}</textarea>
        <button class="pin-note-btn">
            <i class="fa-solid fa-thumbtack"></i>
        </button>
    </div>

    <textarea class="note-text" readonly>${body}</textarea>

   <div class="note-footer">

        <div class="note-icons">
            <button><i class="fa-solid fa-palette"></i></button>
            <button><i class="fa-regular fa-bell"></i></button>
            <button><i class="fa-solid fa-user-plus"></i></button>
            <button><i class="fa-regular fa-image"></i></button>
            <button><i class="fa-solid fa-box-archive"></i></button>
            <div class="menu-wrapper">
                <button class="menu-btn">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>
                <div class="note-menu hidden">
                    <button class="delete-btn">Delete note</button>
                    <button class="label-btn">Add label</button>
                    <button class="drawing-btn">Add drawing</button>
                    <button class="copy-btn">Make a copy</button>
                    <button class="checkbox-btn">Show checkboxes</button>
                    <button class="docs-btn">Copy to Google Docs</button>
                    <button class="history-btn">Version history</button>
                </div>
            </div>
        </div>


        <div class="trash-icons hidden">
            <button class="restore-btn">
                <i class="fa-solid fa-trash-arrow-up"></i>
            </button>
            <button class="delete-forever-btn">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>


        <div class="edit-close-row">
            <button class="edit-close-btn">Close</button>
        </div>

    </div>
`;

    notesGrid.appendChild(note);
    activeNotes.push(note);

    const titleElement = note.querySelector(".note-title");
    const bodyElement = note.querySelector(".note-text");
    const editCloseBtn = note.querySelector(".edit-close-btn");
    const pinBtn = note.querySelector(".pin-note-btn");

    // menu in every note
    const menuBtn = note.querySelector(".menu-btn");
    const noteMenu = note.querySelector(".note-menu");

    const deleteBtn = note.querySelector(".delete-btn");

    const restoreBtn = note.querySelector(".restore-btn");
    const deleteForeverBtn = note.querySelector(".delete-forever-btn");

    autoGrow(titleElement);
    autoGrow(bodyElement);

    //both title and body will grow as we type
    titleElement.addEventListener("input", () => autoGrow(titleElement));
    bodyElement.addEventListener("input", () => autoGrow(bodyElement));

    note.addEventListener("click", (e) => {

        if (e.target.closest(".note-icons")) return;

        // Don't reopen if already editing
        if (note.classList.contains("editing")) return;

        note.classList.add("editing");
        overlay.classList.remove("hidden");

        titleElement.readOnly = false;
        bodyElement.readOnly = false;

        titleElement.focus();

    });

    // close button for opened note
    editCloseBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        titleElement.readOnly = true;
        bodyElement.readOnly = true;
        note.classList.remove("editing");
        overlay.classList.add("hidden");
    });

    // pin note icon button
    pinBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        note.classList.toggle("pinned");
        sortNotes();
    });

    // three dot menu expansion in every note
    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        noteMenu.classList.toggle("hidden");
    });

    // delete note button
    // delete note button
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        // remove from active array
        const index = activeNotes.indexOf(note);
        if (index > -1) {
            activeNotes.splice(index, 1);
        }

        // switch icons
        note.querySelector(".note-icons").classList.add("hidden");
        note.querySelector(".trash-icons").classList.remove("hidden");
        note.querySelector(".pin-note-btn").classList.add("hidden");

        deletedNotes.push(note);
        note.remove();
    });

    // restore button
    restoreBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        const index = deletedNotes.indexOf(note);
        if (index > -1) {
            deletedNotes.splice(index, 1);
        }

        activeNotes.push(note);

        note.querySelector(".trash-icons").classList.add("hidden");
        note.querySelector(".note-icons").classList.remove("hidden");
        note.querySelector(".pin-note-btn").classList.remove("hidden");

        // notesGrid.appendChild(note);
        sortNotes();
        renderNotes(deletedNotes);

    });

    // delete forever
    deleteForeverBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        const index = deletedNotes.indexOf(note);
        if (index > -1) {
            deletedNotes.splice(index, 1);
        }

        note.remove();
    });


}

// pin notes function
function sortNotes() {

    const notes = [...notesGrid.children];

    notes.sort((a, b) => {
        const aPinned = a.classList.contains("pinned");
        const bPinned = b.classList.contains("pinned");

        // pinned notes first
        if (aPinned && !bPinned) return -1;
        if (!aPinned && bPinned) return 1;

        // otherwise keep original order
        return Number(a.dataset.order) - Number(b.dataset.order);
    });

    notes.forEach(note => {
        notesGrid.appendChild(note);
    });

}

// takes activeNotes or deletedNotes array and displays it
function renderNotes(notesArray) {
    notesGrid.innerHTML = "";
    notesArray.forEach(note => {
        notesGrid.appendChild(note);
    });
}

overlay.addEventListener("click", () => {

    const editingNote = document.querySelector(".note.editing");
    if (!editingNote) return;
    editingNote.querySelector(".note-title").readOnly = true;
    editingNote.querySelector(".note-text").readOnly = true;
    editingNote.classList.remove("editing");
    overlay.classList.add("hidden");

});

notesBtn.addEventListener("click", () => {

    addNote.classList.remove("hidden");
    renderNotes(activeNotes);
});

// Show deleted notes in the bin
trashBin.addEventListener("click", () => {

    addNote.classList.add("hidden");
    renderNotes(deletedNotes);
});
