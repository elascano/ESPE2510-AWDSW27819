<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Usuarios - Modal</title>
    <link rel="stylesheet" href="../public/lib/bootstrap-5.3.5-dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <style>
        body {
            background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
            min-height: 100vh;
        }
        .form-label {
            font-weight: 500;
            color: #2d3a4b;
        }
        .btn-primary {
            background: linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%);
            border: none;
        }
        .btn-primary:hover {
            background: linear-gradient(90deg, #8f94fb 0%, #4e54c8 100%);
        }
        .btn-secondary {
            background: #f5f6fa;
            color: #4e54c8;
            border: none;
        }
        .btn-secondary:hover {
            background: #e0eafc;
            color: #2d3a4b;
        }
    </style>
</head>
<body class="d-flex justify-content-center align-items-center">

    <!-- Botón para abrir el modal -->
    <button class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#crearUsuarioModal">
        Crear Usuario
    </button>

    <!-- Modal -->
    <div class="modal fade" id="createChicken" tabindex="-1" aria-labelledby="createChickenLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          
          <div class="modal-header">
            <h5 class="modal-title text-primary" id="createChickenLabel">Crear Usuario</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>

          <div class="modal-body">
            <form id="createChickenForm">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name">
                </div>
                <div class="mb-3">
                    <label for="color" class="form-label">Color</label>
                    <input type="text" class="form-control" id="color">
                </div>
                <div class="mb-3">
                    <label for="age" class="form-label">Age</label>
                    <input type="number" class="form-control" id="age">
                </div>

                <div class="mb-3">
                    <label for="isMolting" class="form-label">Is Molting</label>
                    <select class="form-select" aria-label="Default select example">
                <option selected>Select a option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                </select>
                </div>


                
                <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>

        </div>
      </div>
    </div>

    <script src="../public/lib/bootstrap-5.3.5-dist/js/bootstrap.bundle.min.js"></script>
    <script>
        const formCrearUsuario = document.getElementById('crearUsuarioForm');
        formCrearUsuario.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(formCrearUsuario);
            fetch('./save.php', {
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
    </script>
</body>
</html>
