 <!-- Carrusel -->

    <div class="carousel-container">
      <div class="carousel">
        <div class="carousel-item">
          <img src="./assets/img/pruebaCarrusel1.jpeg" alt="Imagen 1" />
        </div>
        <div class="carousel-item">
          <img src="./assets/img/pruebaCarrusel2.jpeg" alt="Imagen 2" />
        </div>
        <div class="carousel-item">
          <img src="./assets/img/pruebaCarrusel3.jpeg" alt="Imagen 3" />
        </div>
        <!-- Flechas de navegación -->
        <button class="carousel-button prev" onclick="moveCarousel(-1)">
          &#10094;
        </button>
        <button class="carousel-button next" onclick="moveCarousel(1)">
          &#10095;
        </button>
      </div>
    </div>



     let currentSlide = 0;

function moveCarousel(direction) {
const items = document.querySelectorAll('.carousel-item');
const totalSlides = items.length;

    // Cambiar el índice de la imagen
    currentSlide += direction;

    // Si llegamos al final o al principio, reiniciar el carrusel
    if (currentSlide < 0) {
      currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
      currentSlide = 0;
    }

    // Mostrar solo la imagen actual
    items.forEach((item, index) => {
      item.style.display = index === currentSlide ? 'block' : 'none';
    });

}

window.addEventListener('load', () => {
const carouselEnabled = true; // Cambiar a false si no quieres mostrar el carrusel

    if (carouselEnabled) {
      document.querySelector('.carousel-container').classList.add('active');

      moveCarousel(0); // Mostrar la primera imagen al cargar

      // Mover el carrusel automáticamente cada 10 segundos
      setInterval(() => {
        moveCarousel(1); // Mover hacia la siguiente imagen
      }, 10000); // 10000 ms = 10 segundos
    }

});

/_ Contenedor del carrusel _/
.carousel-container {
position: absolute;
left: 0;
top: 0;
width: 20%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
visibility: hidden; /_ Ocultar el carrusel por defecto _/
}

.carousel {
width: 80%;
position: relative;
overflow: hidden;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
}

.carousel-item {
width: 100%;
height: 100%;
display: flex;
transition: transform 0.5s ease-in-out; /_ Animación para el deslizamiento _/
}

.carousel-item img {
width: 100%;
height: auto;
aspect-ratio: 9/16;
object-fit: cover;
}

/_ Flechas de navegación _/
.carousel-button {
position: absolute;
top: 90%;
transform: translateY(-50%);
background-color: rgba(0, 0, 0, 0.3);
color: white;
font-size: 20px;
border: none;
padding: 10px;
cursor: pointer;
z-index: 1;
}

.prev {
left: 10px;
}

.next {
right: 10px;
}

/_ Activar el carrusel _/
.carousel-container.active {
visibility: visible;
}



<div class="deuda-item">
  <div>
    <p class="deuda-titulo">Vencimiento</p>
    <p>10/02/2025</p>
  </div>
  <div>
    <p class="deuda-titulo">Detalle</p>
    <p>Pago expensas - Periodo 2025 02</p>
  </div>
  <div>
    <p class="deuda-titulo">Importe</p>
    <p class="monto-deuda">$ 1.023.090,02</p>
  </div>
  <input type="checkbox" class="deuda-checkbox" checked />
</div>



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
        const montoTexto = deudaItem.querySelector(".monto-deuda").textContent;

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
