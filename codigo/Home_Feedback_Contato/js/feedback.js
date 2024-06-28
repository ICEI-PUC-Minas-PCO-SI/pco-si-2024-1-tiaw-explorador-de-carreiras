document.addEventListener('DOMContentLoaded', function() {
    loadComments();

    document.getElementById('post-comment').addEventListener('click', function() {
        var commentText = document.getElementById('comment-input').value.trim();
        var username = localStorage.getItem('username');

        if (!username) {
            alert('Você precisa estar logado para comentar.');
            return;
        }

        if (isValidComment(commentText)) {
            var newComment = {
                user: username,
                text: commentText,
                date: new Date().toLocaleString()
            };

            displayComment(newComment);
            addComment(newComment);

            alert('Comentário enviado com sucesso!');
            document.getElementById('comment-input').value = '';

            updateCommentsJSON();
        } else {
            alert('Comentário inválido! Por favor, insira um comentário válido.');
        }
    });

    document.getElementById('clear-history').addEventListener('click', function() {
        if (confirm('Tem certeza de que deseja limpar o histórico de comentários?')) {
            clearComments();
            alert('Histórico de comentários limpo com sucesso!');
            updateCommentsJSON();
        }
    });
});

function loadComments() {
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(comment => {
        displayComment(comment);
    });

    document.getElementById('comments-json').textContent = JSON.stringify(comments, null, 2);
}

function addComment(comment) {
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));

    document.getElementById('comments-json').textContent = JSON.stringify(comments, null, 2);
}

function clearComments() {
    localStorage.removeItem('comments');
    document.getElementById('comments-container').innerHTML = '';
}

function displayComment(comment) {
    var commentContainer = document.getElementById('comments-container');
    var commentElement = document.createElement('div');
    commentElement.classList.add('comment');

    var userElement = document.createElement('div');
    userElement.classList.add('comment-user');
    userElement.textContent = `Comentado por: ${comment.user}`;
    commentElement.appendChild(userElement);

    var textElement = document.createElement('div');
    textElement.classList.add('comment-text');
    textElement.textContent = comment.text;
    commentElement.appendChild(textElement);

    var dateElement = document.createElement('div');
    dateElement.classList.add('comment-date');
    dateElement.textContent = comment.date;
    commentElement.appendChild(dateElement);

    commentContainer.appendChild(commentElement);
}

function isValidComment(commentText) {
    return commentText !== '' && !/^\d+$/.test(commentText);
}

function updateCommentsJSON() {
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    document.getElementById('comments-json').textContent = JSON.stringify(comments, null, 2);
}