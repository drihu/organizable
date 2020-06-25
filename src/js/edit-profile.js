const user = JSON.parse(localStorage.getItem('user'));
const form = document.querySelector('#edit-profile-form');

form.username.value = user.username;
form.email.value = user.email;
form.firstname.value = user.firstName;
form.lastname.value = user.lastName;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const email = e.target.email.value;
  const first_name = e.target.firstname.value;
  const last_name = e.target.lastname.value;

  fetch(`http://localhost:3000/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${user.token}`,
    },
    body: JSON.stringify({
      user: {
        username,
        email,
        first_name,
        last_name,
      },
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.errors) {
        console.error(json.errors);
      } else {
        localStorage.setItem('token', json.token);
        localStorage.setItem('user', JSON.stringify(json));
        window.location.replace('profile.html');
      }
    });
});
