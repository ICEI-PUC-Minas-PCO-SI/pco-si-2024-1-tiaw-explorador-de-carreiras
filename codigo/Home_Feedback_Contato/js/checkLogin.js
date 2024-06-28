document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
        const username = localStorage.getItem('username');
        document.getElementById('welcome-message').style.display = 'block';
        document.getElementById('welcome-message').innerText = `Bem-vindo, ${username}`;
        document.getElementById('login-button').style.display = 'none';
        document.getElementById('register-button').style.display = 'none';
        document.getElementById('logout-button').style.display = 'block';
    } else {
        document.getElementById('welcome-message').innerText = '';
        document.getElementById('login-button').style.display = 'block';
        document.getElementById('register-button').style.display = 'block';
        document.getElementById('logout-button').style.display = 'none';

        const links = document.querySelectorAll('a');
        links.forEach(link => {
            if (!link.id.includes('login-button') && !link.id.includes('register-button')) {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    Swal.fire({
                        icon: 'warning',
                        title: 'Acesso Negado',
                        text: 'Você precisa estar logado para acessar essa página.',
                    });
                });
            }
        });
    }
});