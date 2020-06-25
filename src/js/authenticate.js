function authenticate() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user) window.location.replace('login.html');
}

authenticate();
