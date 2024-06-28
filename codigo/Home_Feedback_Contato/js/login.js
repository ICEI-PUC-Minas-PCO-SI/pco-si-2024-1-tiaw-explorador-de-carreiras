document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const validUser = users.find(
            (user) => user.username === username && user.password === password
        );

        if (validUser) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);

            Swal.fire({
                icon: 'success',
                title: 'Login realizado com sucesso!',
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                window.location.href = window.location.href =
                    '/pco-si-2024-1-tiaw-explorador-de-carreiras/codigo/Home_Feedback_Contato/index.html';
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro de autenticação',
                text: 'Usuário ou senha incorretos!',
            });
        }
    });
});