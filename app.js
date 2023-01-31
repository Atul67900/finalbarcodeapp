// JsBarcode("#barcode", "TMP/2245");
showNotes();
var btn = document.querySelector(".recBtn");
btn.addEventListener("click", (ea) => {
  btn.classList.add("bn");

  let recognition = new webkitSpeechRecognition();
  recognition.lang = "en-GB";
  recognition.addEventListener("result", (e) => {
    document.querySelector(".text").value = e.results[0][0].transcript;
    btn.classList.remove("bn");
    // searhing();
    reduceSpaces();
    window.print();
  });
  recognition.start();
});

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let addAltTitle = document.getElementById("addAltTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    tiitle: addTitle.value,
    text: addTxt.value,
    altTitle: addAltTitle.value,
  };
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  addAltTitle.value = "";
  showNotes();
});


// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <div class="noteCard mx-0 card" style="width: 18rem; border: none;">
            <div class="card-body">
                <svg class="barcode"
                    jsbarcode-value="${element.tiitle}"
                    jsbarcode-textmargin="0"
                    jsbarcode-fontoptions="bold">
                </svg>
                <p class="hiddenText">${element.altTitle}</p>          
                <h6>${element.text}</h6>
                <div class="deleteButton">
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Barcode</button>
                </div>
            </div>
        </div>
        `;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes`;
  }
}

// function to delete a Note

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchTxt");

// var el = document.getElementsByClassName("10010input")[0];
// var val = el.value.replace(/\s/g, "");
// alert(val);

function reduceSpaces() {
  let el = document.getElementsByClassName("text")[0];
  let val = el.value.replace(/\s/g, "");
  // console.log(val);

  let search = document.getElementById("searchTxt").value;
  search = val;
  // console.log(search);
  function searhing() {
    let inputVal = search.toUpperCase();
    console.log(inputVal);
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
      let cardTxt = element.getElementsByTagName("p")[0].innerText;
      // console.log(cardTxt);
      if (cardTxt.includes(inputVal)) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    });
  }
  searhing();
}

// Manually searching 
let manualSearch = document.getElementById("manualSearch");
manualSearch.addEventListener("input", function(){
    let inputVal = manualSearch.value.toUpperCase();
    // console.log("Input event fired", inputVal);
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }
    })
})
JsBarcode(".barcode").init();
