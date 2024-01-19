document.addEventListener("DOMContentLoaded", () => {
  loadProducts();

  document
    .getElementById("products-container")
    .addEventListener("click", (event) => {
      const editButton = event.target.closest(".edit-btn");
      if (editButton) {
        const productId = editButton.dataset.productId;
        window.location.href = `./modifica.html?id=${productId}`;
      }
    });
});

function loadProducts() {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhM2I5NTE4N2U1YzAwMTgxNGM2MTEiLCJpYXQiOjE3MDU2NTUxODksImV4cCI6MTcwNjg2NDc4OX0.x2dLmnd2yA3jQpoyyjNJI3JWjnbfDUR0EjRyl-e9XGU",
    },
  })
    .then((response) => response.json())
    .then((products) => {
      const container = document.getElementById("products-container");
      container.innerHTML = "";
      products.forEach((product) => {
        const productCard = `
  <div class="col-md-4">
    <div class="card mb-4 shadow-sm h-100 d-flex"">
      <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.description}</p>
        <div class="d-flex justify-content-between align-items-center">
          <a href="#" class="btn btn-sm btn-outline-secondary cart-icon">
            <i class="bi bi-cart"></i>
          </a>
          <small class="text-muted">${product.price} €</small>
        </div>
      </div>
    </div>
  </div>
`;
        container.innerHTML += productCard;
      });
    })
    .catch((err) => console.error("Error loading products:", err));
}
