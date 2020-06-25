const form = document.querySelector('#login-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.errors) {
        console.log(json.errors.message);
      } else {
        localStorage.setItem('token', json.token);
        localStorage.setItem('user', JSON.stringify(json));
        window.location.replace('my-boards.html');
      }
    });
});
