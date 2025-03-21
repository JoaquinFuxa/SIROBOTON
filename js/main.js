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
