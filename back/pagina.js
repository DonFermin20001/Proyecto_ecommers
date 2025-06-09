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

function addCart(producto) {
  carrito.push(producto);
  actualizarContador();
  mostrarNotificacion(producto.nombre);
}

function actualizarContador() {
  document.getElementById("count").textContent = carrito.length;
}

function listcart() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  let listado = "Productos en el carrito:\n\n";
  carrito.forEach((item, index) => {
    listado += '${index + 1}. ${item.nombre} - $${item.valor.toFixed(2)}\n';
  });

  alert(listado); 
}