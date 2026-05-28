
<?php require_once 'config.php'; ?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FoodBank - Организация корпоративных банкетов под ключ</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <header>
    <nav class="container">
      <div class="logo">FoodBank</div>
      
      <ul class="nav-links">
        <li><a href="#pricing">Тарифы</a></li>
        <li><a href="#reviews">Отзывы клиентов</a></li>
        <li class="has-dropdown">
          <a href="#services">Наши услуги</a>
          <ul class="dropdown">
            <li><a href="#services">Корпоративные банкеты</a></li>
            <li><a href="#services">Фуршеты и кейтеринг</a></li>
            <li><a href="#services">Тематические вечеринки</a></li>
            <li><a href="#services">Кофе-брейки</a></li>
            <li><a href="#services">Выпускные вечера</a></li>
            <li><a href="#services">Свадебные банкеты</a></li>
          </ul>
        </li>
        <li><a href="#team">Наша команда</a></li>
        <li><a href="#projects">Наши проекты</a></li>
        <li><a href="#form">Контакты</a></li>
      </ul>
      
      <div class="header-right">
        <div class="header-phone">8 (800) 444-45-45</div>
        
        <div id="authBlock">
          <button onclick="showLoginModal()" class="auth-btn">Войти</button>
          <button onclick="showRegisterModal()" class="auth-btn">Регистрация</button>
        </div>
        
        <div id="userBlock" style="display:none; align-items:center; gap:12px;">
          <span id="usernameDisplay" style="font-weight:700; color:#5F9EA0;"></span>
          <a href="admin.php" class="auth-btn">Кабинет</a>
          <button onclick="logout()" class="auth-btn">Выйти</button>
        </div>

        <div class="language-switcher">
          <button class="language-btn active" data-lang="ru">RU</button>
          <button class="language-btn" data-lang="en">EN</button>
        </div>
      </div>
      
      <div class="burger" id="burger">
        <span></span><span></span><span></span>
      </div>
    </nav>
  </header>

  <!-- Весь твой контент (hero, pricing, services, projects, team, reviews и т.д.) оставь как есть -->

  <section class="form-section" id="form">
    <div class="container">
      <h2>Оставить заявку на организацию банкета</h2>
      <form id="mainForm" action="api/submit.php" method="POST" novalidate>
        <!-- Твои поля формы -->
        <div class="form-row">
          <input type="text" name="name" placeholder="Ваше имя" required>
          <input type="tel" name="phone" placeholder="+7 (___) ___-__-__" required>
        </div>
        <input type="email" name="email" placeholder="E-mail" required>
        <div class="form-row">
          <input type="date" name="event_date" required>
          <input type="number" name="guests" placeholder="Количество гостей" min="1" required>
        </div>
        <select name="event_type" required>
          <option value="" disabled selected>Тип мероприятия</option>
          <option value="corporate">Корпоративный банкет</option>
          <option value="wedding">Свадебный банкет</option>
          <option value="birthday">День рождения</option>
          <option value="other">Другое</option>
        </select>
        <textarea name="message" placeholder="Дополнительные пожелания" rows="5"></textarea>
        <button type="submit" id="submitBtn">Отправить заявку</button>
      </form>
    </div>
  </section>

  <div id="registerModal" class="modal">
    <div class="modal-content">
      <h3>Регистрация</h3>
      <input type="text" id="reg_name" placeholder="Ваше имя" required>
      <input type="email" id="reg_email" placeholder="E-mail" required>
      <input type="tel" id="reg_phone" placeholder="Телефон">
      <input type="password" id="reg_password" placeholder="Пароль" required>
      <button onclick="registerUser()">Зарегистрироваться</button>
      <button onclick="hideAllModals()">Отмена</button>
    </div>
  </div>

  <div id="loginModal" class="modal">
    <div class="modal-content">
      <h3>Вход в аккаунт</h3>
      <input type="email" id="login_email" placeholder="E-mail" required>
      <input type="password" id="login_password" placeholder="Пароль" required>
      <button onclick="loginUser()">Войти</button>
      <button onclick="hideAllModals()">Отмена</button>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
