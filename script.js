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
    
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !burger.contains(e.target)) {
        burger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  function initSimpleSlider(trackId, prevBtnId, nextBtnId, counterId, totalItems) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const counter = document.getElementById(counterId);
    
    if (!track || !prevBtn || !nextBtn || !counter) return null;
    
    const actualSlides = track.children.length;
    const finalTotalItems = totalItems || actualSlides;
    let currentIndex = 0;

    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      counter.textContent = `${currentIndex + 1}/${finalTotalItems}`;
    }

    prevBtn.addEventListener('click', () => { currentIndex = (currentIndex > 0) ? currentIndex - 1 : finalTotalItems - 1; updateSlider(); });
    nextBtn.addEventListener('click', () => { currentIndex = (currentIndex < finalTotalItems - 1) ? currentIndex + 1 : 0; updateSlider(); });

    updateSlider();
  }

  function initAllSliders() {
    const isMobile = window.innerWidth <= 992;

    if (document.getElementById('achievementsTrack')) initSimpleSlider('achievementsTrack', 'achievementsPrev', 'achievementsNext', 'achievementsCounter', 6);
    if (document.getElementById('pricingTrack') && isMobile) initSimpleSlider('pricingTrack', 'pricingPrev', 'pricingNext', 'pricingCounter', 4);
    if (document.getElementById('competenciesTrack') && isMobile) initSimpleSlider('competenciesTrack', 'competenciesPrev', 'competenciesNext', 'competenciesCounter', 8);
    if (document.getElementById('supportTrack') && isMobile) initSimpleSlider('supportTrack', 'supportPrev', 'supportNext', 'supportCounter', 8);
    if (document.getElementById('teamTrack') && isMobile) initSimpleSlider('teamTrack', 'teamPrev', 'teamNext', 'teamCounter', 6);
    if (document.getElementById('projectsTrack') && isMobile) initSimpleSlider('projectsTrack', 'projectsPrev', 'projectsNext', 'projectsCounter', 7);
  }

  function initReviewsSlider() {
    console.log('Reviews slider initialized');
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
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.status === 'success') {
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                mainForm.reset();
                document.getElementById('priceCalculation').style.display = 'none';
            } else {
                errorMessage.textContent = result.message || 'Ошибка отправки заявки';
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            }
        } catch (error) {
            console.error('Fetch error:', error);
            errorMessage.textContent = 'Ошибка соединения с сервером';
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить заявку';
        }
    });
  }

  function initPhoneMask() {
    document.querySelectorAll('input[type="tel"]').forEach(input => {
      input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        let formatted = '+7 ';
        if (value.length > 1) formatted += '(' + value.slice(1, 4);
        if (value.length >= 4) formatted += ') ' + value.slice(4, 7);
        if (value.length >= 7) formatted += '-' + value.slice(7, 9);
        if (value.length >= 9) formatted += '-' + value.slice(9, 11);
        e.target.value = formatted;
      });
    });
  }

  function initDateInputs() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    document.querySelectorAll('input[type="date"]').forEach(input => {
      input.min = today.toISOString().split('T')[0];
      if (!input.value) input.value = tomorrow.toISOString().split('T')[0];
    });
  }

  function initTariffs() {
    document.querySelectorAll('[data-details]').forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const id = this.getAttribute('data-details');
        const details = document.getElementById(id) || document.getElementById(`details-${id}`);
        if (details) {
          const active = details.classList.toggle('active');
          this.textContent = active ? 'Скрыть' : 'Подробнее';
        }
      });
    });
  }

  function initShowMoreButton() {
    const btn = document.getElementById('showMoreBtn');
    const hidden = document.getElementById('hiddenProjects');
    if (!btn || !hidden) return;
    
    btn.addEventListener('click', () => {
      const active = hidden.classList.toggle('active');
      btn.innerHTML = active 
        ? '<span>Скрыть проекты</span><span class="arrow">↑</span>'
        : '<span>Показать еще проекты</span><span class="arrow">↓</span>';
    });
  }

  function initPriceCalculator() {
    const guestsInput = document.getElementById('guests');
    const tariffSelect = document.getElementById('tariff');
    const priceCalculation = document.getElementById('priceCalculation');
    const totalPrice = document.getElementById('totalPrice');
    const priceInfo = document.getElementById('priceInfo');

    if (!guestsInput || !tariffSelect) return;

    function calculatePrice() {
      const guests = parseInt(guestsInput.value) || 0;
      const option = tariffSelect.selectedOptions[0];
      if (!option || guests <= 0) {
        priceCalculation.style.display = 'none';
        return;
      }
      const pricePerPerson = parseInt(option.getAttribute('data-price')) || 0;
      const total = guests * pricePerPerson;
      priceInfo.textContent = `${guests} гостей × ${pricePerPerson} ₽/чел`;
      totalPrice.textContent = total.toLocaleString('ru-RU') + ' ₽';
      priceCalculation.style.display = 'block';
    }

    guestsInput.addEventListener('input', calculatePrice);
    tariffSelect.addEventListener('change', calculatePrice);
  }

  function initAll() {
    initBurgerMenu();
    initAllSliders();
    initReviewsSlider();
    initPhoneMask();
    initDateInputs();
    initTariffs();
    initShowMoreButton();
    initPriceCalculator();
    initForm();          
  }

  initAll();
});

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
        name: document.getElementById('reg_name').value,
        email: document.getElementById('reg_email').value,
        phone: document.getElementById('reg_phone').value,
        password: document.getElementById('reg_password').value
    };

    const res = await fetch('api/register.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);
    if (result.status === 'success') {
        hideAllModals();
    }
}

async function loginUser() {
    const data = {
        email: document.getElementById('login_email').value,
        password: document.getElementById('login_password').value
    };

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
    } else {
        alert(result.message);
    }
}

function logout() {
    fetch('api/logout.php', { method: 'POST' });
    document.getElementById('authBlock').style.display = 'flex';
    document.getElementById('userBlock').style.display = 'none';
}

async function showProfile() {
    hideAllModals();
    const modal = document.getElementById('profileModal');
    modal.style.display = 'flex';

    const res = await fetch('api/profile.php');
    const data = await res.json();

    if (data.status === 'success') {
        let html = `<p><strong>Имя:</strong> ${data.user.name}</p>
                    <p><strong>Email:</strong> ${data.user.email}</p>
                    <p><strong>Телефон:</strong> ${data.user.phone || 'Не указан'}</p>`;

        if (data.orders.length > 0) {
            html += '<table border="1" style="width:100%; margin-top:15px; border-collapse:collapse;">';
            html += '<tr><th>Дата</th><th>Тип</th><th>Гостей</th><th>Статус</th></tr>';
            
            data.orders.forEach(order => {
                html += `<tr>
                    <td>${order.event_date}</td>
                    <td>${order.event_type}</td>
                    <td>${order.guests}</td>
                    <td>Активна</td>
                </tr>`;
            });
            html += '</table>';
        } else {
            html += '<p>У вас пока нет заявок.</p>';
        }

        document.getElementById('profileInfo').innerHTML = html;
    }
}
