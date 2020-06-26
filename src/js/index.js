const boardTemplate = document.querySelector(".board");
const boardsSection = document.querySelector(".boards-section") 
const starredBoards = boardsSection.children[0].children[1];
const myBoards = boardsSection.children[1].children[1];
const newBoardLayout = document.querySelector(".bg-layout"); 
const newBoardCard = newBoardLayout.querySelector(".new-board__input");

function clickCreateButton() {
  const createBoardButton = document.querySelector(".create-board__button");
  createBoardButton.addEventListener("click", showModal);
}

function showModal() {
  newBoardLayout.classList.remove("hidden");
}

function setModalBoard() {
  setColors();
  addSubmitData();
  const closeIcon = newBoardCard.querySelector(".window__icon-close");
  closeIcon.addEventListener("click", closeModal);
}

function setColors() {
  const palette = document.querySelectorAll(".color");
  palette.forEach( (colorContainer) => {
    colorContainer.style.background = colorContainer.dataset.color;
    colorContainer.addEventListener("click", changeColor);
  });
}

function changeColor() {
  newBoardCard.style.background = this.style.background;
}

function closeModal() {
  newBoardLayout.classList.add("hidden");
  form.reset();
}

function addSubmitData() {
  const submitButton = document.querySelector(".new-board__submit");
  const formNewBoard = document.querySelector(".new-board__form"); 
  formNewBoard.addEventListener("submit", (event) => {
    event.preventDefault();
    form = event.target;
    console.log(form);
    newBoardContent = form.children[0].children[0].value;
    console.log(newBoardContent);
    //postBoardData();
    createBoard(form, newBoardContent);
  });
}

function postBoardData() {
  
}

function createBoard(form, content) {
  const newBoard = boardTemplate.cloneNode(true);
  console.log(newBoard);
  const newBoardOptions = newBoard.querySelector(".board__options")
  const closeIcon = newBoardOptions.children[0];
  const starIcon = newBoardOptions.children[1];
  newBoard.classList.remove("hidden");
  const formInput = form.children[0];
  newBoard.style.background = window.getComputedStyle(formInput).background;
  newBoard.children[0].textContent = content; 
  //closeIcon.addEventListener("click", closeBoard);
  newBoard.addEventListener("mouseover", showBoardIcons);
  newBoard.addEventListener("mouseout", hideBoardIcons);
  starIcon.addEventListener("click", starBoard);
  myBoards.append(newBoard);
  closeModal();
}

function starBoard() {
  const board = this.parentElement.parentElement;
  const starredBoard = board.cloneNode(true);
  const boardOptions = starredBoard.querySelector(".board__options");
  const closeIcon = boardOptions.children[0];
  const starIcon = boardOptions.children[1];
  closeIcon.classList.add("hidden");
  starIcon.classList.add("yellow");
  starredBoards.append(starredBoard);
  board.remove();
  starIcon.addEventListener("click", unstarBoard); 
}

function unstarBoard() {
  const board = this.parentElement.parentElement;
  const regularBoard = board.cloneNode(true);
  const boardOptions = regularBoard.querySelector(".board__options");
  const closeIcon = boardOptions.children[0];
  const starIcon = boardOptions.children[1];
  boardOptions.classList.add("hidden");
  closeIcon.classList.remove("hidden");
  starIcon.classList.remove("yellow");
  //closeIcon.addEventListener("click", closeBoard);
  regularBoard.addEventListener("mouseover", showBoardIcons);
  regularBoard.addEventListener("mouseout", hideBoardIcons);
  starIcon.addEventListener("click", starBoard);
  myBoards.append(regularBoard);
  board.remove();
}


function showBoardIcons() {
  const boardOptions = this.querySelector(".board__options");
  boardOptions.classList.remove("hidden");
}

function hideBoardIcons() {
  const boardOptions = this.querySelector(".board__options");
  boardOptions.classList.add("hidden"); 
}

setModalBoard();
clickCreateButton();
