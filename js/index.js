console.log("Welcome to My Notebook");
showNotes();

// If user adds a note, it'll be added to the localstorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addHeading = document.getElementById("heading");
    // console.log(addHeading.value)
    let notes = localStorage.getItem("notes");
    let headings = localStorage.getItem("headings")
    // console.log(notes)
    if (notes == null && headings==null) {
        headingsObj = [];
        notesObj = [];
    }
    else {
        headingsObj = JSON.parse(headings)
        notesObj = JSON.parse(notes);
    }
    headingsObj.push(addHeading.value)
    notesObj.push(addText.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = "";
    localStorage.setItem("headings", JSON.stringify(headingsObj));
    addHeading.value = "";
    // console.log(notes+"-----"+ addHeading)
    showNotes();
})


// Function to show elements from localStorage
function showNotes() {
    let headings = localStorage.getItem("headings")
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
        headingsObj = [];
    } else {
        headingsObj = JSON.parse(headings);
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
              <div class="noteCard my-2 mx-3 card justify-content-between" style="width: 18rem; ">
                      <div class="card-body">
                            <h5 class="card-title">${headingsObj[index]}</h5>
                            <p class="card-text"> ${element}</p>
                            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary" style="box-shadow:none">Delete Note</button>
                      </div>
                  </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<h5>Nothing to show! Use "Add a Note" section above to add notes.</h5>`;
    }
}

// Function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    let headings = localStorage.getItem("headings");
    // if (notes == null) {
    //     notesObj = [];
    // } else {
    //     notesObj = JSON.parse(notes);
    // }
    notesObj.splice(index, 1);
    headingsObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("headings",JSON.stringify(headingsObj));
    showNotes();
}

let search = document.getElementById("searchText");
search.addEventListener("input", function (e) {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardText = element.getElementsByTagName("p")[0].innerText;
        console.log(cardText)
        if (cardText.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})

{/* <button id="${index}" type="button" onclick="markNote(this.id)" class="btn btn-danger btn-sm p-2" style="box-shadow:none">Mark</button> */}
