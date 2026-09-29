// Referencias a elementos
const form = document.getElementById("formCliente");
const mensajeExito = document.getElementById("mensajeExito");

const cedula = document.getElementById("cedula");
const nombre = document.getElementById("nombre");
const direccion = document.getElementById("direccion");
const telefono = document.getElementById("telefono");
const correo = document.getElementById("correo");

// Función para mostrar u ocultar mensajes de error
function mostrarError(input, idError, mensaje) {
  const spanError = document.getElementById(idError);
  if (mensaje) {
    spanError.textContent = mensaje;
    input.classList.add("invalido");
    return false;
  } else {
    spanError.textContent = "";
    input.classList.remove("invalido");
    return true;
  }
}

// Validar Cédula (10 dígitos numéricos)
function validarCedula() {
  const valor = cedula.value.trim();
  const soloNumeros = /^[0-9]{10}$/;
  if (valor === "") {
    return mostrarError(cedula, "errorCedula", "La cédula es obligatoria.");
  }
  if (!soloNumeros.test(valor)) {
    return mostrarError(cedula, "errorCedula", "La cédula debe tener 10 dígitos numéricos.");
  }
  return mostrarError(cedula, "errorCedula", "");
}

// Validar Nombre (Obligatorio, máx. 30 caracteres)
function validarNombre() {
  const valor = nombre.value.trim();
  if (valor === "") {
    return mostrarError(nombre, "errorNombre", "El nombre es obligatorio.");
  }
  if (valor.length > 30) {
    return mostrarError(nombre, "errorNombre", "Máximo 30 caracteres.");
  }
  return mostrarError(nombre, "errorNombre", "");
}

// Validar Dirección (Obligatoria, máx. 50 caracteres)
function validarDireccion() {
  const valor = direccion.value.trim();
  if (valor === "") {
    return mostrarError(direccion, "errorDireccion", "La dirección es obligatoria.");
  }
  if (valor.length > 50) {
    return mostrarError(direccion, "errorDireccion", "Máximo 50 caracteres.");
  }
  return mostrarError(direccion, "errorDireccion", "");
}

// Validar Teléfono (10 dígitos numéricos)
function validarTelefono() {
  const valor = telefono.value.trim();
  const soloNumeros = /^[0-9]{10}$/;
  if (valor === "") {
    return mostrarError(telefono, "errorTelefono", "El teléfono es obligatorio.");
  }
  if (!soloNumeros.test(valor)) {
    return mostrarError(telefono, "errorTelefono", "El teléfono debe tener 10 dígitos numéricos.");
  }
  return mostrarError(telefono, "errorTelefono", "");
}

// Validar Correo Electrónico
function validarCorreo() {
  const valor = correo.value.trim();
  const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (valor === "") {
    return mostrarError(correo, "errorCorreo", "El correo es obligatorio.");
  }
  if (!formatoCorreo.test(valor)) {
    return mostrarError(correo, "errorCorreo", "Ingrese un correo electrónico válido.");
  }
  return mostrarError(correo, "errorCorreo", "");
}

// Validación en tiempo real (evento input)
cedula.addEventListener("input", validarCedula);
nombre.addEventListener("input", validarNombre);
direccion.addEventListener("input", validarDireccion);
telefono.addEventListener("input", validarTelefono);
correo.addEventListener("input", validarCorreo);

// Validación al enviar
form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  
  const cedulaValida = validarCedula();
  const nombreValido = validarNombre();
  const direccionValida = validarDireccion();
  const telefonoValido = validarTelefono();
  const correoValido = validarCorreo();

  if (cedulaValida && nombreValido && direccionValida && telefonoValido && correoValido) {
    mensajeExito.textContent = "Cliente guardado correctamente.";
    form.reset();
  } else {
    mensajeExito.textContent = "";
  }
});