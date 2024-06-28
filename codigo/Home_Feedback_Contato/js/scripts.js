document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector("#form");
    const nameInput = document.querySelector("#nome");
    const emailInput = document.querySelector("#email");
    const resumoInput = document.querySelector("#resumo");
    const messageTextarea = document.querySelector("#message");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (nameInput.value === "") {
            alert("Insira um nome");
            return;
        }
        if (emailInput.value === "" || !isEmailValid(emailInput.value)) {
            alert("Insira um email válido");
            return;
        }
        if (resumoInput.value === "") {
            alert("Insira o resumo");
            return;
        }
        if (messageTextarea.value === "") {
            alert("Insira a descrição");
            return;
        }

        const templateParams = {
            to_name: nameInput.value,
            message2: resumoInput.value,
            message: messageTextarea.value,
            email: emailInput.value
        };

        emailjs.send('service_ifmn04u', 'template_h3wk13w', templateParams, '3lufZ8j1zVh7ZahKa')
            .then(function(response) {
                alert('Solicitação enviada com sucesso!', response.status, response.text);
                form.reset();
            }, function(error) {
                alert('Erro ao enviar a solicitação:', error);
            });
    });

    function isEmailValid(email) {
        const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
        return emailRegex.test(email);
    }
});