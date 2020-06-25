const user = JSON.parse(localStorage.getItem('user'));
const form = document.querySelector('#profile-form');

form.username.value = user.username;
form.email.value = user.email;
form.firstname.value = user.firstName;
form.lastname.value = user.lastName;

form.edit.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.replace('edit-profile.html');
});
