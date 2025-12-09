document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profile-form');
    const profilePreview = document.getElementById('profile-preview');
    const editProfileBtn = document.getElementById('edit-profile');
    
    // Элементы предпросмотра
    const previewFields = {
        firstName: document.getElementById('preview-firstName'),
        lastName: document.getElementById('preview-lastName'),
        age: document.getElementById('preview-age'),
        email: document.getElementById('preview-email'),
        phone: document.getElementById('preview-phone'),
        occupation: document.getElementById('preview-occupation'),
        bio: document.getElementById('preview-bio')
    };

    // Обработчик отправки формы
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные из формы
        const formData = new FormData(profileForm);
        const profileData = {};
        
        for (let [key, value] of formData.entries()) {
            profileData[key] = value;
        }
        
        // Обновляем предпросмотр
        updatePreview(profileData);
        
        // Показываем предпросмотр и скрываем форму
        profileForm.classList.add('hidden');
        profilePreview.classList.remove('hidden');
        
        // Сохраняем в localStorage (можно заменить на отправку на сервер)
        localStorage.setItem('userProfile', JSON.stringify(profileData));
        
        alert('Профиль успешно сохранен!');
    });

    // Кнопка редактирования
    editProfileBtn.addEventListener('click', function() {
        profilePreview.classList.add('hidden');
        profileForm.classList.remove('hidden');
    });

    // Функция обновления предпросмотра
    function updatePreview(data) {
        previewFields.firstName.textContent = data.firstName || 'Не указано';
        previewFields.lastName.textContent = data.lastName || 'Не указано';
        previewFields.age.textContent = data.age ? data.age + ' лет' : 'Не указано';
        previewFields.email.textContent = data.email || 'Не указано';
        previewFields.phone.textContent = data.phone || 'Не указано';
        
        // Обработка выпадающего списка
        const occupationSelect = document.getElementById('occupation');
        const selectedOption = occupationSelect.options[occupationSelect.selectedIndex];
        previewFields.occupation.textContent = selectedOption.text || 'Не указано';
        
        previewFields.bio.textContent = data.bio || 'Не указано';
    }

    // Загрузка сохраненных данных при загрузке страницы
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        const profileData = JSON.parse(savedProfile);
        
        // Заполняем форму сохраненными данными
        Object.keys(profileData).forEach(key => {
            const field = document.getElementById(key);
            if (field) {
                field.value = profileData[key];
            }
        });
        
        // Показываем предпросмотр вместо формы
        updatePreview(profileData);
        profileForm.classList.add('hidden');
        profilePreview.classList.remove('hidden');
    }

    // Валидация email в реальном времени
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('blur', function() {
        const email = this.value;
        if (email && !isValidEmail(email)) {
            this.style.borderColor = 'red';
            alert('Пожалуйста, введите корректный email адрес');
        } else {
            this.style.borderColor = '';
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});