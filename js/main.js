// FUNCIÓN PARA VALIDAR QUE SOLO SE INGRESEN 19 DÍGITOS NUMÉRICOS
function validateInput() {
    const input = document.getElementById("payment-code");
    let value = input.value;

    // Elimina todo lo que no sea un número
    value = value.replace(/[^0-9]/g, "");

    // Establece el valor del input a los números válidos
    input.value = value;

    // Actualiza el contador de caracteres
    const charCountElement = document.getElementById("char-count");
    const charCount = input.value.length;

    // Cambia el color del contador si es igual a 19
    if (charCount === 19) {
        charCountElement.style.color = "green"; // Cambia a verde
    } else {
        charCountElement.style.color = "#ff0000"; // Color por defecto
    }

    // Actualiza el texto del contador
    charCountElement.textContent = `${charCount}/19`;
}

// LOGICA PARA DESPLEGAR EL CUADRO DE MESA DE AYUDA

const helpLink = document.getElementById("help-link");
const helpBox = document.getElementById("help-box");

// Mostrar el cuadro de ayuda al hacer clic en "Mesa de ayuda"
helpLink.addEventListener("click", function (event) {
    event.preventDefault();
    helpBox.classList.toggle("show"); // Alternar la clase 'show'

    // Calcular la posición del botón para colocar el cuadro de ayuda justo debajo
    const buttonRect = helpLink.getBoundingClientRect();
    helpBox.style.top = `${buttonRect.bottom + window.scrollY + 15}px`; // 10px de margen
    helpBox.style.left = `${buttonRect.left + window.scrollX}px`; // Alinearlo con el botón
});

// Ocultar el cuadro de ayuda si se hace clic fuera de él
document.addEventListener("click", function (event) {
    if (!helpBox.contains(event.target) && event.target !== helpLink) {
        helpBox.classList.remove("show");
    }
});

// SELECTOR DE CHECKBOX DE INTERFAZ "DEUDAS A PAGAR"
document.getElementById("selectAll").addEventListener("change", function () {
    const checkboxes = document.querySelectorAll(".deuda-checkbox");
    checkboxes.forEach((checkbox) => {
        checkbox.checked = this.checked;
    });
    calcularTotal(); // Recalcular el total cuando se selecciona o deselecciona todo
});

const selectAll = document.getElementById("selectAll");
const checkboxes = document.querySelectorAll(".deuda-checkbox");

// Función para calcular el total a pagar
function calcularTotal() {
    let total = 0;

    // Recorremos todos los checkboxes
    checkboxes.forEach((checkbox) => {
        const deudaItem = checkbox.closest(".deuda-item"); // Obtener el contenedor de cada deuda
        const montoTexto = deudaItem.querySelector(".monto-deuda").textContent; // Seleccionamos el segundo p (el del importe)

        // Convertir el monto a número, limpiando el símbolo $ y la coma
        const monto = parseFloat(
            montoTexto.replace(/[^\d.-]/g, "").replace(",", "."),
        );

        // Si el checkbox está marcado, sumamos el monto
        if (checkbox.checked) {
            total += monto;
        }
    });

    // Actualizar el "Total a pagar"
    const totalPago = document.getElementById("total-a-pagar");
    totalPago.textContent = `$ ${total.toFixed(2)}`; // Mostrar con dos decimales
}

// Escuchar cambios en los checkboxes para recalcular el total
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
        // Actualizar el "Seleccionar todas" si corresponde
        if (!this.checked) {
            selectAll.checked = false;
        } else if (Array.from(checkboxes).every((cb) => cb.checked)) {
            selectAll.checked = true;
        }

        // Recalcular el total cada vez que un checkbox cambia
        calcularTotal();
    });
});

// Inicializar el total cuando se cargue la página
calcularTotal();
