document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("turnoForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Limpiar errores previos
        document.querySelectorAll(".error-msg").forEach(el => el.textContent = "");

        let isValid = true;

        // Validar Cédula (10 dígitos numéricos)
        const cedula = document.getElementById("cedula").value.trim();
        if (!/^\d{10}$/.test(cedula)) {
            showError("error-cedula", "Ingrese una cédula válida de 10 dígitos.");
            isValid = false;
        }

        // Validar Apellidos
        const apellidos = document.getElementById("apellidos").value.trim();
        if (apellidos === "") {
            showError("error-apellidos", "El campo apellidos es obligatorio.");
            isValid = false;
        }

        // Validar Nombres
        const nombres = document.getElementById("nombres").value.trim();
        if (nombres === "") {
            showError("error-nombres", "El campo nombres es obligatorio.");
            isValid = false;
        }

        // Validar Fecha de Nacimiento
        const fechaNac = document.getElementById("fechaNacimiento").value;
        if (fechaNac === "") {
            showError("error-fechaNacimiento", "Seleccione su fecha de nacimiento.");
            isValid = false;
        }

        // Validar Sexo
        const sexo = document.querySelector('input[name="sexo"]:checked');
        if (!sexo) {
            showError("error-sexo", "Seleccione una opción de sexo.");
            isValid = false;
        }

        // Validar Celular (10 dígitos)
        const celular = document.getElementById("celular").value.trim();
        if (!/^\d{10}$/.test(celular)) {
            showError("error-celular", "Ingrese un número celular válido (10 dígitos).");
            isValid = false;
        }

        // Validar Correo Electrónico
        const correo = document.getElementById("correo").value.trim();
        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoRegex.test(correo)) {
            showError("error-correo", "Ingrese un correo electrónico válido.");
            isValid = false;
        }

        // Validar Especialidad
        const especialidad = document.getElementById("especialidad").value;
        if (especialidad === "") {
            showError("error-especialidad", "Seleccione una especialidad médica.");
            isValid = false;
        }

        // Validar Fecha del Turno
        const fechaTurno = document.getElementById("fechaTurno").value;
        if (fechaTurno === "") {
            showError("error-fechaTurno", "Seleccione la fecha para el turno.");
            isValid = false;
        }

        // Validar Horario
        const horario = document.getElementById("horario").value;
        if (horario === "") {
            showError("error-horario", "Seleccione un horario disponible.");
            isValid = false;
        }

        // Validar Discapacidad
        const discapacidad = document.querySelector('input[name="discapacidad"]:checked');
        if (!discapacidad) {
            showError("error-discapacidad", "Indique si presenta alguna discapacidad.");
            isValid = false;
        }

        // Si todo es válido
        if (isValid) {
            alert("¡Turno registrado exitosamente!\n\nPaciente: " + nombres + " " + apellidos + "\nEspecialidad: " + especialidad + "\nFecha: " + fechaTurno);
            form.reset();
        }
    });

    function showError(elementId, message) {
        document.getElementById(elementId).textContent = message;
    }
});