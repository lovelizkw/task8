document.addEventListener('DOMContentLoaded', function() {

    // ==================== БУРГЕР И СЛАЙДЕРЫ ====================
    function initBurgerMenu() {
        const burger = document.getElementById('burger');
        const mobileMenu = document.getElementById('mobileMenu');
        if (burger && mobileMenu) {
            burger.addEventListener('click', () => {
                burger.classList.toggle('active');
                mobileMenu.classList.toggle('active');
            });
        }
    }

    function initAllSliders() {
        console.log("Слайдеры инициализированы");
    }

    // ==================== ФОРМА ЗАЯВКИ ====================
    function initForm() {
        const form = document.getElementById('mainForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('submitBtn');
            btn.disabled = true;
            btn.textContent = 'Отправка...';

            const data = Object.fromEntries(new FormData(form));

            try {
                const res = await fetch('api/submit.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await res.json();

                if (result.status === 'success') {
                    alert(result.message);
                    form.reset();
                } else {
                    alert(result.message);
                }
            } catch (err) {
                alert('Ошибка соединения');
            }

            btn.disabled = false;
            btn.textContent = 'Отправить заявку';
        });
    }

    // ==================== АВТОРИЗАЦИЯ ====================
    function showRegisterModal() {
        hideAllModals();
        document.getElementById('registerModal').style.display = 'flex';
    }

    function showLoginModal() {
        hideAllModals();
        document.getElementById('loginModal').style.display = 'flex';
    }

    function hideAllModals() {
        document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
    }

    async function registerUser() {
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
        } catch (e) {
            alert("Ошибка соединения с сервером");
        }
    }

    async function loginUser() {
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
        } catch (e) {
            alert("Ошибка соединения с сервером");
        }
    }

    function logout() {
        fetch('api/logout.php', { method: 'POST' });
        document.getElementById('authBlock').style.display = 'flex';
        document.getElementById('userBlock').style.display = 'none';
    }

    // ==================== ЗАПУСК ====================
    function initAll() {
        initBurgerMenu();
        initAllSliders();
        initForm();
    }

    initAll();
});
