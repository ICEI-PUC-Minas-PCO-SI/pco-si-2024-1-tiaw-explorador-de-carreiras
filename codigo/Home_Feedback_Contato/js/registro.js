document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword =
            document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Erro de registro',
                text: 'As senhas não coincidem!',
            });
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];

        const userExists = users.some((user) => user.username === username);
        if (userExists) {
            Swal.fire({
                icon: 'error',
                title: 'Erro de registro',
                text: 'Nome de usuário já existe!',
            });
            return;ário
        }

        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);

        Swal.fire({
            icon: 'success',
            title: 'Registro bem-sucedido',
            text: 'Conta criada com sucesso!',
        }).then(() => {
            window.location.href =
                '/pco-si-2024-1-tiaw-explorador-de-carreiras/codigo/Home_Feedback_Contato/sprint%204/index.html';
        });
    });
});