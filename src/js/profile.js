const user = JSON.parse(localStorage.getItem('user'));
const form = document.querySelector('#profile-form');

form.username.value = user.username;
form.email.value = user.email;
form.firstname.value = user.firstName;
form.lastname.value = user.lastName;

form.addEventListener('submit', (e) => e.preventDefault());

form.edit.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.replace('edit-profile.html');
});

form.delete.addEventListener('click', (e) => {
  e.preventDefault();
  fetch(`http://localhost:3000/users/${user.id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Token token=${user.token}`},
  })
    .then((res) => {
      if (res.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.replace('login.html');
      } else {
        console.error(res);
      }
    });
});
