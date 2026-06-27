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

    note.innerHTML = `
    <textarea class="note-title" readonly>${title}</textarea>
    <textarea class="note-text" readonly>${body}</textarea>

   <div class="note-footer">
        <div class="note-icons">

            <button><i class="fa-solid fa-palette"></i></button>
            <button><i class="fa-regular fa-bell"></i></button>
            <button><i class="fa-solid fa-user-plus"></i></button>
            <button><i class="fa-regular fa-image"></i></button>
            <button><i class="fa-solid fa-box-archive"></i></button>
            <button><i class="fa-solid fa-ellipsis-vertical"></i></button>

        </div>

        <div class="edit-close-row">
            <button class="edit-close-btn">Close</button>
        </div>

    </div>
`;

    notesGrid.appendChild(note);

    const titleElement = note.querySelector(".note-title");
    const bodyElement = note.querySelector(".note-text");
    const editCloseBtn = note.querySelector(".edit-close-btn");

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

    editCloseBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        titleElement.readOnly = true;
        bodyElement.readOnly = true;
        note.classList.remove("editing");
        overlay.classList.add("hidden");
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