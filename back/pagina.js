// Alquiler
  document.addEventListener('DOMContentLoaded', function () {
    const brandFilter = document.getElementById('brandFilter');
    const typeFilter = document.getElementById('typeFilter');
    const toolCards = document.querySelectorAll('.tool-card');

    function filterTools() {
      const selectedBrand = brandFilter.value.toLowerCase();
      const selectedType = typeFilter.value.toLowerCase();

      toolCards.forEach(card => {
        const cardClasses = card.className.toLowerCase();

        const matchBrand = selectedBrand === 'all' || cardClasses.includes(selectedBrand);
        const matchType = selectedType === 'all' || cardClasses.includes(selectedType);

        if (matchBrand && matchType) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }

    brandFilter.addEventListener('change', filterTools);
    typeFilter.addEventListener('change', filterTools);

    // Inicializar con todos visibles
    filterTools();
  });