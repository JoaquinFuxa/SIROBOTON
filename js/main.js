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

helpLink.addEventListener("mouseenter", () => {
    helpBox.classList.add("show");
});
helpLink.addEventListener("mouseleave", () => {
    helpBox.classList.remove("show");
});
helpBox.addEventListener("mouseenter", () => {
    helpBox.classList.add("show");
});
helpBox.addEventListener("mouseleave", () => {
    helpBox.classList.remove("show");
});
