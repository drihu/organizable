const form = document.querySelector('#login-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;

  fetch('http://127.0.0.1:3000/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers:{
      'Content-Type': 'application/json',
    }
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.errors) {
        console.log(json.errors.message);
      } else {
        localStorage.setItem('token', json.token);
        window.location.replace('my-boards.html');
      }
    });
});
