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
  getBoards();
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
  //console.log(newBoardCard.children[0]);
  //newBoardCard.children[0].reset();
}

function addSubmitData() {
  const formNewBoard = document.querySelector(".new-board__form");
  formNewBoard.addEventListener("submit", (event) => {
    event.preventDefault();
    const formInput = event.target.children[0];
    const color = window.getComputedStyle(formInput).backgroundColor;
    const name = formInput.children[0].value;
    const userId = JSON.parse(localStorage.user).id;
    const boardData = {color, name, userId};
    //console.log(newBoardContent);
    postBoardData(boardData);
    createBoard(boardData);
  });
}

function getBoards() {
  const boards = fetch("http://localhost:3000/boards", {
    method: 'GET',
    headers: { 'Authorization': `Token token=${localStorage.token}` }
  }).then((response) => response.json())
    .then((boards) => boards.filter((board) => !board.closed))
    .then((boards) => {
      boards.forEach((board) => {
      board.starred ? createStarredBoard(board) : createBoard(board);
      })
    });
  console.log("termino");
}

function postBoardData(boardData) {
  fetch("http://localhost:3000/boards", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${localStorage.token}`
    },
    body: JSON.stringify({
      board: {
        user_id : boardData.userId,
        name: boardData.name,
        color: boardData.color
      }
    }),
  });
}

function createStarredBoard(boardData) {
  console.log("entro");
  const newBoard = boardTemplate.cloneNode(true);
  newBoard.style.background = boardData.color;
  newBoard.children[0].textContent = boardData.name;
  const boardOptions = newBoard.querySelector(".board__options");
  const closeIcon = boardOptions.children[0];
  const starIcon = boardOptions.children[1];
  starIcon.dataset.boardID = boardData.id;
  newBoard.classList.remove("hidden");
  boardOptions.classList.remove("hidden");
  closeIcon.classList.add("none");
  starIcon.classList.add("yellow");
  starIcon.addEventListener("click", unstarBoard);
  starredBoards.append(newBoard);
}

function createBoard(boardData) {
  const newBoard = boardTemplate.cloneNode(true);
  newBoard.style.background = boardData.color;
  newBoard.children[0].textContent = boardData.name;
  const newBoardOptions = newBoard.querySelector(".board__options");
  const closeIcon = newBoardOptions.children[0];
  const starIcon = newBoardOptions.children[1];
  starIcon.dataset.boardID = boardData.id;
  newBoard.classList.remove("hidden");
  closeIcon.addEventListener("click", () => closeBoard(boardData.id, newBoard));
  newBoard.addEventListener("mouseover", showBoardIcons);
  newBoard.addEventListener("mouseout", hideBoardIcons);
  starIcon.addEventListener("click", starBoard);
  myBoards.append(newBoard);
  closeModal();
}

function closeBoard(boardID, board) {
  fetch(`http://localhost:3000/boards/${boardID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${localStorage.token}`,
    },
    body: JSON.stringify({
      board: { closed : true },
    })
  })
    .then((res) => res.json())
    .then(() => {
      board.remove();
    });
}

function starBoard() {
  const board = this.parentElement.parentElement;
  const starredBoard = board.cloneNode(true);
  const boardOptions = starredBoard.querySelector(".board__options");
  const closeIcon = boardOptions.children[0];
  const starIcon = boardOptions.children[1];
  closeIcon.classList.add("none");
  starIcon.classList.add("yellow");
  starIcon.addEventListener("click", unstarBoard);
  starredBoards.append(starredBoard);
  board.remove();
  const boardID = parseInt(starIcon.dataset.boardID);
  console.log(boardID);
  const starredStatus = true;
  updateBoardStatus(boardID, starredStatus);
}

function unstarBoard() {
  const board = this.parentElement.parentElement;
  const regularBoard = board.cloneNode(true);
  const boardOptions = regularBoard.querySelector(".board__options");
  const closeIcon = boardOptions.children[0];
  const starIcon = boardOptions.children[1];
  boardOptions.classList.add("hidden");
  closeIcon.classList.remove("none");
  starIcon.classList.remove("yellow");
  regularBoard.addEventListener("mouseover", showBoardIcons);
  regularBoard.addEventListener("mouseout", hideBoardIcons);
  starIcon.addEventListener("click", starBoard);
  myBoards.append(regularBoard);
  board.remove();
  const boardID = parseInt(starIcon.dataset.boardID);
  console.log(boardID);
  const starredStatus = false;
  updateBoardStatus(boardID, starredStatus);
}

function updateBoardStatus(boardID, status) {
  fetch(`http://localhost:3000/boards/${boardID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${localStorage.token}`,
    },
    body: JSON.stringify({
      board: {
        starred : status
      },
    })
  });
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
