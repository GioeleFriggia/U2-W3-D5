document.addEventListener("DOMContentLoaded", () => {
  const productId = new URLSearchParams(window.location.search).get("id");

  if (productId) {
    loadProductDetails(productId);
  } else {
    console.error("Product ID missing in the URL");
  }

  // Aggiungo evento per il salvataggio delle modifiche
  document.getElementById("save-btn").addEventListener("click", () => {
    saveProductChanges(productId);
  });

  // Aggiungo evento per l'eliminazione del prodotto
  document.getElementById("delete-btn").addEventListener("click", () => {
    deleteProduct(productId);
  });
});

function loadProductDetails(productId) {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhM2I5NTE4N2U1YzAwMTgxNGM2MTEiLCJpYXQiOjE3MDU2NTUxODksImV4cCI6MTcwNjg2NDc4OX0.x2dLmnd2yA3jQpoyyjNJI3JWjnbfDUR0EjRyl-e9XGU",
    },
  })
    .then((response) => response.json())
    .then((product) => {
      document.getElementById("product-name").value = product.name;
      document.getElementById("product-description").value =
        product.description;
      document.getElementById("product-brand").value = product.brand;
      document.getElementById("product-imageUrl").value = product.imageUrl;
      document.getElementById("product-price").value = product.price;
    })
    .catch((err) => console.error("Error fetching product details:", err));
}

function deleteProduct(productId) {
  const authToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhM2I5NTE4N2U1YzAwMTgxNGM2MTEiLCJpYXQiOjE3MDU2NTUxODksImV4cCI6MTcwNjg2NDc4OX0.x2dLmnd2yA3jQpoyyjNJI3JWjnbfDUR0EjRyl-e9XGU";

  const endpoint = `https://striveschool-api.herokuapp.com/api/product/${productId}`;

  fetch(endpoint, {
    method: "DELETE",
    headers: {
      Authorization: authToken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Errore nella richiesta: ${response.status} - ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((result) => {
      alert("Prodotto eliminato con successo!");
      window.location.href = "./backoffice.html";
      console.log(result);
    })
    .catch((error) => {
      console.error("Si è verificato un errore durante l'eliminazione:", error);
      alert(
        "Si è verificato un errore durante l'eliminazione del prodotto. Controlla la console per ulteriori dettagli."
      );
    });
}

function saveProductChanges(productId) {
  const authToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhM2I5NTE4N2U1YzAwMTgxNGM2MTEiLCJpYXQiOjE3MDU2NTUxODksImV4cCI6MTcwNjg2NDc4OX0.x2dLmnd2yA3jQpoyyjNJI3JWjnbfDUR0EjRyl-e9XGU";

  const endpoint = `https://striveschool-api.herokuapp.com/api/product/${productId}`;

  const productData = {
    name: document.getElementById("product-name").value,
    description: document.getElementById("product-description").value,
    brand: document.getElementById("product-brand").value,
    imageUrl: document.getElementById("product-imageUrl").value,
    price: parseFloat(document.getElementById("product-price").value),
  };

  fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
    body: JSON.stringify(productData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Errore nella richiesta: ${response.status} - ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((result) => {
      alert("Modifiche salvate con successo!");

      console.log(result);
    })
    .catch((error) => {
      console.error(
        "Si è verificato un errore durante il salvataggio delle modifiche:",
        error
      );
      alert(
        "Si è verificato un errore durante il salvataggio delle modifiche. Controlla la console per ulteriori dettagli."
      );
    });
}
