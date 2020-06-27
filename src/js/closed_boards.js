const wrapper = document.querySelector(".boards-wrapper");
const board = wrapper.getElementsByClassName("board");
const trashButton = document.querySelectorAll(".fa-trash-o");

for (let i = 0; i < board.length; i++) {
  trashButton[i].addEventListener("click", function() {
    board[i].classList.add('hidden');
  });
}

function createBoard(board) {
  const div = document.createElement('div');
  div.classList.add('board');
  div.style.background = board.color;
  div.innerHTML = `
    <p class="board__content">${board.name}</p>
    <div class= "board__options ">
      <i class="fa fa-trash-o"></i>
      <i class="fa fa-undo"></i>
    </div>
  `;

  const trashButton = div.querySelector('.fa-trash-o');
  const undoButton = div.querySelector('.fa-undo');

  trashButton.addEventListener('click', () => {
    fetch(`http://localhost:3000/boards/${board.id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Token token=${localStorage.token}` },
    })
      .then((res) => {
        if (res.ok) div.remove();
        else console.error(res);
      })
  });

  undoButton.addEventListener('click', () => {
    fetch(`http://localhost:3000/boards/${board.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token token=${localStorage.token}`,
      },
      body: JSON.stringify({
        board: { closed: false },
      }),
    })
      .then((res) => {
        if (res.ok) div.remove();
        else console.error(res);
      })
  });

  return div;
}

fetch("http://localhost:3000/boards", {
  method: 'GET',
  headers: { 'Authorization': `Token token=${localStorage.token}` }
})
  .then((res) => res.json())
  .then((boards) => boards.filter((board) => board.closed))
  .then((closedBoards) => {
    closedBoards.forEach((board) => {
      console.log(board);
      wrapper.append(createBoard(board));
    });
  });
