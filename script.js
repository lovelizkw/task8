document.addEventListener('DOMContentLoaded', function() {

    function initBurgerMenu() {
        const burger = document.getElementById('burger');
        const mobileMenu = document.getElementById('mobileMenu');
        if (!burger || !mobileMenu) return;

        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            burger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    function initSimpleSlider(trackId, prevBtnId, nextBtnId, counterId, totalItems) {
        const track = document.getElementById(trackId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        const counter = document.getElementById(counterId);
        if (!track || !prevBtn || !nextBtn || !counter) return;

        let currentIndex = 0;
        const total = totalItems || track.children.length;

        function update() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            counter.textContent = `${currentIndex + 1}/${total}`;
        }

        prevBtn.addEventListener('click', () => { currentIndex = (currentIndex > 0) ? currentIndex - 1 : total - 1; update(); });
        nextBtn.addEventListener('click', () => { currentIndex = (currentIndex < total - 1) ? currentIndex + 1 : 0; update(); });

        update();
    }

    function initAllSliders() {
        const isMobile = window.innerWidth <= 992;
        if (document.getElementById('achievementsTrack')) initSimpleSlider('achievementsTrack', 'achievementsPrev', 'achievementsNext', 'achievementsCounter', 6);
        if (isMobile) {
            if (document.getElementById('pricingTrack')) initSimpleSlider('pricingTrack', 'pricingPrev', 'pricingNext', 'pricingCounter', 4);
            if (document.getElementById('competenciesTrack')) initSimpleSlider('competenciesTrack', 'competenciesPrev', 'competenciesNext', 'competenciesCounter', 8);
            if (document.getElementById('supportTrack')) initSimpleSlider('supportTrack', 'supportPrev', 'supportNext', 'supportCounter', 8);
            if (document.getElementById('teamTrack')) initSimpleSlider('teamTrack', 'teamPrev', 'teamNext', 'teamCounter', 6);
            if (document.getElementById('projectsTrack')) initSimpleSlider('projectsTrack', 'projectsPrev', 'projectsNext', 'projectsCounter', 7);
        }
    }

    function initForm() {
        const mainForm = document.getElementById('mainForm');
        if (!mainForm) return;

        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');

        mainForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('api/submit.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.status === 'success') {
                    successMessage.style.display = 'block';
                    errorMessage.style.display = 'none';
                    mainForm.reset();
                    document.getElementById('priceCalculation').style.display = 'none';
                } else {
                    errorMessage.textContent = result.message || 'Ошибка отправки';
                    errorMessage.style.display = 'block';
                    successMessage.style.display = 'none';
                }
            } catch (error) {
                errorMessage.textContent = 'Ошибка соединения с сервером';
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить заявку';
            }
        });
    }

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
            alert('Заполните обязательные поля');
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
            alert('Ошибка соединения');
        }
    }

    async function loginUser() {
        const data = {
            email: document.getElementById('login_email').value.trim(),
            password: document.getElementById('login_password').value
        };

        if (!data.email || !data.password) {
            alert('Введите email и пароль');
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
                alert(result.message || 'Ошибка входа');
            }
        } catch (e) {
            alert('Ошибка соединения с сервером');
        }
    }

    function logout() {
        fetch('api/logout.php', { method: 'POST' });
        document.getElementById('authBlock').style.display = 'flex';
        document.getElementById('userBlock').style.display = 'none';
    }

    function initAll() {
        initBurgerMenu();
        initAllSliders();
        initForm();
        initPhoneMask();
        initDateInputs();
        initTariffs();
        initShowMoreButton();
        initPriceCalculator();
    }

    initAll();
});
