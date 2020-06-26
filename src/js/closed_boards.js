const wrapper = document.querySelector(".boards-wrapper");
const board = wrapper.getElementsByClassName("board");
const trashButton = document.querySelectorAll(".fa-trash-o");

for (let i = 0; i < board.length; i++) {
  trashButton[i].addEventListener("click", function() {
    board[i].classList.add('hidden');
  });
}
