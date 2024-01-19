document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("product-form");
  if (productForm) {
    productForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      await saveProductChanges();
    });
  } else {
    console.error("Elemento con id 'product-form' non trovato.");
  }

  loadProducts();
});

async function loadProducts() {
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
      <div class="card mb-4 shadow-sm">
        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
        <div class="card-body product-card-body"> <!-- Added class 'product-card-body' -->
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button data-product-id="${product._id}" class="btn btn-sm btn-outline-secondary edit-btn">Modifica</button>
            </div>
            <small class="text-muted">${product.price} €</small>
          </div>
        </div>
      </div>
    </div>
  `;
        container.innerHTML += productCard;
      });

      // Aggiungi l'evento click ai pulsanti "Modifica"
      const editButtons = document.querySelectorAll(".edit-btn");
      editButtons.forEach((editButton) => {
        editButton.addEventListener("click", (event) => {
          const productId = editButton.dataset.productId;
          window.location.href = `./modifica.html?id=${productId}`;
        });
      });
    })
    .catch((err) => console.error("Error loading products:", err));
}

async function saveProductChanges() {
  const productData = {
    name: document.getElementById("product-name").value,
    description: document.getElementById("product-description").value,
    brand: document.getElementById("product-brand").value,
    imageUrl: document.getElementById("product-imageUrl").value,
    price: parseFloat(document.getElementById("product-price").value),
  };

  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhM2I5NTE4N2U1YzAwMTgxNGM2MTEiLCJpYXQiOjE3MDU2NTUxODksImV4cCI6MTcwNjg2NDc4OX0.x2dLmnd2yA3jQpoyyjNJI3JWjnbfDUR0EjRyl-e9XGU",
        },
        body: JSON.stringify(productData),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Errore nella richiesta: ${response.status} - ${response.statusText}`
      );
    }

    const result = await response.json();

    alert("Prodotto salvato con successo!");
    loadProducts(); // Aggiorna la lista dei prodotti dopo averne aggiunto uno nuovo
    console.log(result);
  } catch (error) {
    console.error(
      "Si è verificato un errore durante il salvataggio del prodotto:",
      error
    );
    alert(
      "Si è verificato un errore durante il salvataggio del prodotto. Controlla la console per ulteriori dettagli."
    );
  }
}
