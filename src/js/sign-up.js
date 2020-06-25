const form = document.querySelector('#signup-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;
  const email = e.target.email.value;
  const first_name = e.target.firstname.value;
  const last_name = e.target.lastname.value;

  fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user: {
        username,
        password,
        email,
        first_name,
        last_name,
      },
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.id === undefined) {
        console.log(json);
      } else {
        localStorage.setItem('token', json.token);
        localStorage.setItem('user', JSON.stringify(json));
        window.location.replace('my-boards.html');
      }
    })
});
