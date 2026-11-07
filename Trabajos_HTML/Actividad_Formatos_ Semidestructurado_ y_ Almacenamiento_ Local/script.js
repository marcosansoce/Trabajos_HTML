document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    const tableBody = document.getElementById('studentTableBody');
    const btnReset = document.getElementById('btnReset');

    // Expresiones Regulares para validación
    const regex = {
        cedula: /^\d{10}$/,
        apellidos: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
        nombres: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
        direccion: /^.{5,100}$/,
        telefono: /^09\d{8}$/,
        correo: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        facultad: /^.+$/,
        nivel: /^.+$/,
        paralelo: /^[a-zA-Z0-9]{1,2}$/
    };

    // Mensajes de error personalizados
    const messages = {
        cedula: 'Debe contener exactamente 10 dígitos numéricos.',
        apellidos: 'Solo letras y espacios (2 a 50 caracteres).',
        nombres: 'Solo letras y espacios (2 a 50 caracteres).',
        direccion: 'Mínimo 5 caracteres.',
        telefono: 'Debe empezar con 09 y tener 10 dígitos.',
        correo: 'Ingrese un correo electrónico válido.',
        facultad: 'Seleccione una facultad.',
        nivel: 'Seleccione un nivel.',
        paralelo: 'Debe ser de 1 o 2 caracteres alfanuméricos.'
    };

    // Cargar registros desde LocalStorage al iniciar
    loadStudents();

    // Escuchadores de eventos para validación en tiempo real (input/change)
    Object.keys(regex).forEach(fieldId => {
        const input = document.getElementById(fieldId);
        const eventType = input.tagName === 'SELECT' ? 'change' : 'input';
        
        input.addEventListener(eventType, () => {
            validateField(fieldId);
        });
    });

    // Evento Submit del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isFormValid = true;
        Object.keys(regex).forEach(fieldId => {
            const isValid = validateField(fieldId);
            if (!isValid) isFormValid = false;
        });

        if (!isFormValid) return;

        const newStudent = {
            cedula: document.getElementById('cedula').value.trim(),
            apellidos: document.getElementById('apellidos').value.trim(),
            nombres: document.getElementById('nombres').value.trim(),
            direccion: document.getElementById('direccion').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            correo: document.getElementById('correo').value.trim(),
            facultad: document.getElementById('facultad').value,
            nivel: document.getElementById('nivel').value,
            paralelo: document.getElementById('paralelo').value.trim().toUpperCase()
        };

        if (isCedulaDuplicate(newStudent.cedula)) {
            showError('cedula', 'Esta cédula ya se encuentra registrada.');
            return;
        }

        saveStudent(newStudent);
        resetForm();
        loadStudents();
    });

    // Evento Limpiar
    btnReset.addEventListener('click', resetForm);

    // Función para validar un campo individual
    function validateField(fieldId) {
        const input = document.getElementById(fieldId);
        const value = input.value.trim();
        const isValid = regex[fieldId].test(value);

        if (isValid) {
            clearError(fieldId);
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            showError(fieldId, messages[fieldId]);
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        }

        return isValid;
    }

    function showError(fieldId, message) {
        const errorElement = document.getElementById(`error-${fieldId}`);
        const inputElement = document.getElementById(fieldId);
        errorElement.textContent = message;
        inputElement.classList.add('is-invalid');
        inputElement.classList.remove('is-valid');
    }

    function clearError(fieldId) {
        const errorElement = document.getElementById(`error-${fieldId}`);
        errorElement.textContent = '';
    }

    function resetForm() {
        form.reset();
        Object.keys(regex).forEach(fieldId => {
            const input = document.getElementById(fieldId);
            input.classList.remove('is-valid', 'is-invalid');
            clearError(fieldId);
        });
    }

    // Operaciones de LocalStorage usando JSON
    function getStoredStudents() {
        const data = localStorage.getItem('estudiantes');
        return data ? JSON.parse(data) : [];
    }

    function saveStudent(student) {
        const students = getStoredStudents();
        students.push(student);
        localStorage.setItem('estudiantes', JSON.stringify(students));
    }

    function isCedulaDuplicate(cedula) {
        const students = getStoredStudents();
        return students.some(student => student.cedula === cedula);
    }

    window.deleteStudent = function(cedula) {
        let students = getStoredStudents();
        students = students.filter(student => student.cedula !== cedula);
        localStorage.setItem('estudiantes', JSON.stringify(students));
        loadStudents();
    };

    // Renderizado de la tabla
    function loadStudents() {
        const students = getStoredStudents();
        tableBody.innerHTML = '';

        if (students.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="9" class="empty-table">No hay estudiantes registrados.</td>
                </tr>`;
            return;
        }

        students.forEach(student => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${escapeHtml(student.cedula)}</td>
                <td>${escapeHtml(student.apellidos)} ${escapeHtml(student.nombres)}</td>
                <td>${escapeHtml(student.direccion)}</td>
                <td>${escapeHtml(student.telefono)}</td>
                <td>${escapeHtml(student.correo)}</td>
                <td>${escapeHtml(student.facultad)}</td>
                <td>${escapeHtml(student.nivel)}°</td>
                <td>${escapeHtml(student.paralelo)}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteStudent('${student.cedula}')">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});