document.addEventListener('DOMContentLoaded', () => {

  window.showRegisterModal = () => {
    hideAllModals();
    document.getElementById('registerModal').style.display = 'flex';
  };

  window.showLoginModal = () => {
    hideAllModals();
    document.getElementById('loginModal').style.display = 'flex';
  };

  window.hideAllModals = () => {
    document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
  };

  window.registerUser = async () => {
    const data = {
      name: document.getElementById('reg_name').value.trim(),
      email: document.getElementById('reg_email').value.trim(),
      phone: document.getElementById('reg_phone').value.trim(),
      password: document.getElementById('reg_password').value
    };

    if (!data.name || !data.email || !data.password) {
      alert("Заполните обязательные поля");
      return;
    }

    try {
      const res = await fetch('api/register.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
      const result = await res.json();
      alert(result.message);
      if (result.status === 'success') hideAllModals();
    } catch(e) {
      alert("Ошибка соединения");
    }
  };

  window.loginUser = async () => {
    const data = {
      email: document.getElementById('login_email').value.trim(),
      password: document.getElementById('login_password').value
    };

    if (!data.email || !data.password) {
      alert("Введите email и пароль");
      return;
    }

    try {
      const res = await fetch('api/login.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
      const result = await res.json();

      if (result.status === 'success') {
        hideAllModals();
        document.getElementById('authBlock').style.display = 'none';
        document.getElementById('userBlock').style.display = 'flex';
        document.getElementById('usernameDisplay').textContent = result.user.name;
        alert('Вход выполнен успешно!');
      } else {
        alert(result.message);
      }
    } catch(e) {
      alert("Ошибка соединения");
    }
  };

  window.logout = () => {
    fetch('api/logout.php', { method: 'POST' });
    location.reload();
  };

  console.log("FoodBank script loaded");
});
