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

// creating notes function
function createNote(title, body) {

    const note = document.createElement("div");
    note.className = "note";

    note.innerHTML = `
    <h3>${title}</h3>
    <p>${body}</p>

    <div class="note-icons">

        <button><i class="fa-solid fa-palette"></i></button>
        <button><i class="fa-regular fa-bell"></i></button>
        <button><i class="fa-solid fa-user-plus"></i></button>
        <button><i class="fa-regular fa-image"></i></button>
        <button><i class="fa-solid fa-box-archive"></i></button>
        <button><i class="fa-solid fa-ellipsis-vertical"></i></button>

    </div>
`;

    notesGrid.appendChild(note);

}
