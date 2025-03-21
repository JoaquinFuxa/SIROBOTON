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
