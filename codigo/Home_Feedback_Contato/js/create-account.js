document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Erro de registro',
                text: 'As senhas não coincidem!'
            });
        } else {
            const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
            accounts.push({ username, password });
            localStorage.setItem('accounts', JSON.stringify(accounts));
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);

            Swal.fire({
                icon: 'success',
                title: 'Registro bem-sucedido',
                text: 'Conta criada com sucesso!'
            }).then(() => {
                window.location.href = '/pco-si-2024-1-tiaw-explorador-de-carreiras/codigo/Home_Feedback_Contato/sprint%204/index.html';
            });
        }
    });
});
