$(document).ready(function() {
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        const username = $('#username').val().trim();
        const password = $('#password').val();
        const rememberMe = $('#rememberMe').is(':checked');

        $('#loginBtn').prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Iniciando sesión...');

        // Use server-side session login endpoint (auth.php) which will set PHP session used by other API endpoints
        $.ajax({
            url: '../PHP/auth.php',
            method: 'POST',
            data: {
                action: 'login',
                username: username,
                password: password
            },
            success: function(response) {
                let res = typeof response === "object" ? response : JSON.parse(response);
                if (res.success) {
                    // Keep a small client-side flag so existing JS that checks localStorage continues to work
                    localStorage.setItem('authToken', res.user_id || 'session');
                    localStorage.setItem('userName', res.username || username);
                    showAlert('success', '¡Inicio de sesión exitoso! Redirigiendo...');
                    setTimeout(function() {
                        window.location.href = 'dashboard.html';
                    }, 800);
                } else {
                    showAlert('danger', res.message || res.msg || 'Usuario o contraseña incorrectos');
                    $('#loginBtn').prop('disabled', false).html('<i class="fas fa-sign-in-alt"></i> Iniciar Sesión');
                }
            },
            error: function(xhr, status, error) {
                showAlert('danger', 'Error al conectar con el servidor.');
                $('#loginBtn').prop('disabled', false).html('<i class="fas fa-sign-in-alt"></i> Iniciar Sesión');
            }
        });
    });

    function showAlert(type, message) {
        const alertDiv = $('#alertMessage');
        alertDiv.removeClass('alert-success alert-danger');
        alertDiv.addClass('alert-' + type);
        $('#alertText').text(message);
        alertDiv.show();
        if (type === 'success') {
            setTimeout(function() {
                alertDiv.hide();
            }, 3000);
        }
    }
});
