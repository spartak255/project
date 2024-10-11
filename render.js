// Фейковые данные для проверки существующих пользователей и почт
const fakeData = {
    users: [
        { username: "testuser", email: "test@domain.com", password: "password123" }
    ],
    emailVerificationCode: "1234" // Имитируем код для отправки на почту
};

// Функция для валидации регистрации
function validateRegistration(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const code = document.getElementById('code').value;

    let isValid = true;

    // Проверка имени пользователя
    if (fakeData.users.some(user => user.username === username)) {
        document.getElementById('username-error').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('username-error').classList.add('hidden');
    }

    // Проверка email
    if (!validateEmail(email) || fakeData.users.some(user => user.email === email)) {
        document.getElementById('email-error').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('email-error').classList.add('hidden');
    }

    // Проверка пароля
    if (password.length < 8) {
        document.getElementById('password-error').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('password-error').classList.add('hidden');
    }

    // Проверка кода
    if (code !== fakeData.emailVerificationCode) {
        document.getElementById('code-error').classList.remove('hidden');
        isValid = false;
    } else {
        document.getElementById('code-error').classList.add('hidden');
    }

    // Если все поля заполнены корректно
    if (isValid) {
        alert("Регистрация успешна!");
        fakeData.users.push({ username, email, password });  // Добавляем нового пользователя
        document.getElementById('registration-modal').classList.add('hidden'); // Закрываем модал
    } else {
    }
}

// Проверка email с использованием регулярного выражения
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

// Инициализация формы регистрации
document.getElementById('registration-form').addEventListener('submit', validateRegistration);

// Открытие модального окна
document.getElementById('open-registration-modal').addEventListener('click', () => {
    document.getElementById('registration-modal').classList.remove('hidden');
});
