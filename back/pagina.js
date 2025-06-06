// Alquiler
const brandFilter = document.getElementById("brandFilter");
  const typeFilter = document.getElementById("typeFilter");
  const tools = document.querySelectorAll(".tool-card");

  function filterTools() {
    const brand = brandFilter.value;
    const type = typeFilter.value;

    tools.forEach(tool => {
      const matchBrand = brand === "all" || tool.classList.contains(brand);
      const matchType = type === "all" || tool.classList.contains(type);
      tool.classList.toggle("active", matchBrand && matchType);
    });
  }

  brandFilter.addEventListener("change", filterTools);
  typeFilter.addEventListener("change", filterTools);

  // Mostrar todos por defecto
  filterTools();
  