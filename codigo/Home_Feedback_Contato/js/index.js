document.addEventListener('DOMContentLoaded', function() {
    const welcomeMessage = document.getElementById('welcome-message');
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
    const logoutButton = document.getElementById('logout-button');

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');

    if (isLoggedIn && username) {
        welcomeMessage.style.display = 'inline';
        welcomeMessage.innerHTML = `Bem-vindo, ${username}!`;
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
        logoutButton.style.display = 'inline';
    } else {
        welcomeMessage.style.display = 'none';
        loginButton.style.display = 'inline';
        registerButton.style.display = 'inline';
        logoutButton.style.display = 'none';
    }

    logoutButton.addEventListener('click', function(event) {
        event.preventDefault(); 
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('isLoggedIn');

        Swal.fire({
            icon: 'info',
            title: 'Logout realizado com sucesso!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.location.href = '/pco-si-2024-1-tiaw-explorador-de-carreiras/codigo/Home_Feedback_Contato/sprint%204/login.html'
        });
    });
});