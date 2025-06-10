// Alquiler
  document.addEventListener('DOMContentLoaded', function () {
    const brandFilter = document.getElementById('brandFilter');
    const typeFilter = document.getElementById('typeFilter');
    const stateFilter = document.getElementById('stateFilter')
    const toolCards = document.querySelectorAll('.tool-card');

    function filterTools() {
      const selectedBrand = brandFilter.value.toLowerCase();
      const selectedType = typeFilter.value.toLowerCase();
      const selectedState = stateFilter.value.toLowerCase();

      toolCards.forEach(card => {
        const cardClasses = card.className.toLowerCase();

        const matchBrand = selectedBrand === 'all' || cardClasses.includes(selectedBrand);
        const matchType = selectedType === 'all' || cardClasses.includes(selectedType);
        const matchState = selectedState === 'all' || cardClasses.includes(selectedState);

        if (matchBrand && matchType && matchState) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }

    brandFilter.addEventListener('change', filterTools);
    typeFilter.addEventListener('change', filterTools);
    stateFilter.addEventListener('change', filterTools);
    // Inicializar con todos visibles
    filterTools();
  });

// carrito 
let carrito = [];

function addCarrito(boton) {
  const productoDiv = boton.closest(".card"); // Subimos al div que contiene todo

  const nombre = productoDiv.querySelector(".card-title").textContent;
  const precioTexto = productoDiv.querySelector(".card-text").textContent;
  const imagen = productoDiv.querySelector(".card-img-top").getAttribute("src");

  const valor = parseFloat(precioTexto.replace(/[^0-9.]/g, "")); // Elimina $ y convierte a número

  const producto = {
    nombre: nombre,
    valor: valor,
    imagen: imagen
  };

  addCart(producto); // Ya la tienes definida
}
function addCart(producto) {
  carrito.push(producto);
  actualizarContador();
  actualizarSidebar();
  mostrarNotificacion(producto.nombre);
}

function actualizarContador() {
  document.getElementById("count").textContent = carrito.length;
}

function toggleSidebar() {
  document.getElementById("cartSidebar").classList.toggle("open");
}

function actualizarSidebar() {
  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";

  if (carrito.length === 0) {
    cartItemsContainer.innerHTML = "<p>El carrito está vacío.</p>";
    return;
  }

  carrito.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.textContent = `${index + 1}. ${item.nombre} - $${item.valor.toFixed(2)}`;
    itemDiv.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-right: 10px;">
      <div style="display: inline-block; vertical-align: top;">
        <strong>${item.nombre}</strong><br>
        $${item.valor.toFixed(2)}
      </div>`;
    cartItemsContainer.appendChild(itemDiv);
  });
}

// kits
  function cambiarImagenPrincipal(src) {
    document.getElementById("imagen-principal").src = src;
  }

