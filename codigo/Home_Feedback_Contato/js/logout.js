document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logout-button');
    
    logoutButton.addEventListener('click', function(event) {
        event.preventDefault(); 
        // Remova apenas a exibição do nome de usuário e o botão Sair do cabeçalho
        document.getElementById('welcome-message').innerText = '';
        document.getElementById('login-button').style.display = 'block';
        document.getElementById('register-button').style.display = 'block';
        document.getElementById('logout-button').style.display = 'none';
        
        Swal.fire({
            icon: 'info',
            title: 'Logout realizado com sucesso!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            // Redireciona para a página de login após o logout
            window.location.href = 'login.html';
        });
    });
});