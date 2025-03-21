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

//------------------------------------------------

const deudasScroll = document.querySelector(".deudas-scroll");
const selectAllCheckbox = document.getElementById("selectAll");
const totalAPagar = document.getElementById("total-a-pagar");

// Función para formatear importe
const formatearImporte = (monto) => {
    return monto.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2,
    });
};

// Renderizar deudas dinámicamente
function renderDeudas() {
    const deudas = countsData[0].deudas;
    deudasScroll.innerHTML = "";

    deudas.forEach((deuda, index) => {
        const deudaItem = document.createElement("div");
        deudaItem.classList.add("deuda-item");

        deudaItem.innerHTML = `
      <div>
        <p class="deuda-titulo">Vencimiento</p>
        <p>${deuda.vencimiento.toLocaleDateString("es-AR")}</p>
      </div>
      <div>
        <p class="deuda-titulo">Detalle</p>
        <p>${deuda.detalle}</p>
      </div>
      <div>
        <p class="deuda-titulo">Importe</p>
        <p class="monto-deuda">${formatearImporte(deuda.importe)}</p>
      </div>
      <input type="checkbox" class="deuda-checkbox" data-index="${index}" checked />
    `;
        deudasScroll.appendChild(deudaItem);
    });

    addCheckboxListeners();
    actualizarTotal();
}

// Escuchar cambios en los checkboxes individuales
function addCheckboxListeners() {
    const checkboxes = document.querySelectorAll(".deuda-checkbox");

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const todosMarcados = Array.from(checkboxes).every(
                (cb) => cb.checked,
            );
            selectAllCheckbox.checked = todosMarcados;
            actualizarTotal();
        });
    });
}

// Manejo del checkbox "Seleccionar todas"
selectAllCheckbox.addEventListener("change", () => {
    const checkboxes = document.querySelectorAll(".deuda-checkbox");
    checkboxes.forEach((cb) => (cb.checked = selectAllCheckbox.checked));
    actualizarTotal();
});

// Función para actualizar el total
function actualizarTotal() {
    const checkboxes = document.querySelectorAll(".deuda-checkbox");
    let total = 0;
    const deudas = countsData[0].deudas;

    checkboxes.forEach((cb, i) => {
        if (cb.checked) {
            total += deudas[i].importe;
        }
    });

    totalAPagar.textContent = formatearImporte(total);
}

// Inicializar
renderDeudas();
