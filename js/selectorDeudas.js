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

document.addEventListener("DOMContentLoaded", function () {
    const nextButton = document.querySelector(".button-actions:not(.volver)");
    const popupContainer = document.getElementById("popup-container");
    const omitButton = document.getElementById("omit-btn");
    const nextPopupButton = document.getElementById("next-btn");
    const mainContent = document.querySelector("main");
    const headercontent = document.querySelector("header");
    const footercontent = document.querySelector("footer");

    nextButton.addEventListener("click", function () {
        popupContainer.classList.remove("hidden");
        mainContent.classList.add("blur");
        headercontent.classList.add("blur");
        footercontent.classList.add("blur");
    });

    omitButton.addEventListener("click", function () {
        popupContainer.classList.add("hidden");
        mainContent.classList.remove("blur");
        headercontent.classList.remove("blur");
        footercontent.classList.remove("blur");
    });

    nextPopupButton.addEventListener("click", function () {
        const emailInput = document.getElementById("email-input").value.trim();

        // Expresión regular para validar un email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (emailRegex.test(emailInput)) {
            // Email válido o campo vacío (porque es opcional)
            alert("Email válido. Procediendo...");
            // Aquí puedes continuar con la lógica de tu app
        } else {
            alert("Por favor, ingresa un email válido.");
        }
        popupContainer.classList.add("hidden");
        mainContent.classList.remove("blur");
        headercontent.classList.remove("blur");
        footercontent.classList.remove("blur");
    });
});
