"use strict";

const formCalculadora = document.getElementById("formCalculadora");
const campoNumero1 = document.getElementById("numero1");
const campoNumero2 = document.getElementById("numero2");

const operaciones = [
  {
    id: "resultadoSuma",
    calcular: (numero1, numero2) => numero1 + numero2
  },
  {
    id: "resultadoResta",
    calcular: (numero1, numero2) => numero1 - numero2
  },
  {
    id: "resultadoMultiplicacion",
    calcular: (numero1, numero2) => numero1 * numero2
  },
  {
    id: "resultadoDivision",
    calcular: (numero1, numero2) => numero2 === 0
      ? "Error: No se puede dividir entre cero."
      : numero1 / numero2
  },
  {
    id: "resultadoModulo",
    calcular: (numero1, numero2) => numero2 === 0
      ? "Error: No se puede calcular el módulo con divisor cero."
      : numero1 % numero2
  }
];

formCalculadora.addEventListener("submit", function(event) {
  event.preventDefault();

  const numero1 = campoNumero1.valueAsNumber;
  const numero2 = campoNumero2.valueAsNumber;

  for (let iteracion = 0; iteracion < operaciones.length; iteracion++) {
    const operacion = operaciones[iteracion];
    document.getElementById(operacion.id).textContent = operacion.calcular(numero1, numero2);
  }
});