document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const loginPage = document.getElementById('loginPage');
  const inventoryPage = document.getElementById('inventoryPage');
  const userDisplay = document.getElementById('userDisplay');

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();

    if (username) {
      userDisplay.textContent = username;
      loginPage.style.display = 'none';
      inventoryPage.style.display = 'block';
    }
  });
});
