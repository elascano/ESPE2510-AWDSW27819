        const formCrearUsuario = document.getElementById('createChickenForm');
        formCrearUsuario.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(formCrearUsuario);
            fetch('./public/app/save.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                Swal.fire('Genial', data, 'success');
                formCrearUsuario.reset();
                // Cierra el modal automáticamente
                const modal = bootstrap.Modal.getInstance(document.getElementById('createChicken'));
                modal.hide();
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire('Error', 'Ocurrió un problema al guardar', 'error');
            });
        });