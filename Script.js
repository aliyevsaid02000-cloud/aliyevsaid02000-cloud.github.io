function loadProducts() {
  let products = JSON.parse(localStorage.getItem("products") || "[]");
  let list = document.getElementById("product-list");

  if (!list) return;

  list.innerHTML = "";

  products.forEach((p, index) => {
    list.innerHTML += `
      <div class="product-item">
        <img src="${p.image}">
        <div>
          <h3>${p.name}</h3>
          <p>${p.price} AZN</p>

          <div class="actions">
            <a href="edit-product.html?i=${index}">Redaktə</a>
            <a href="#" onclick="deleteProduct(${index})">Sil</a>
          </div>
        </div>
      </div>
    `;
  });
}

function deleteProduct(i) {
  let products = JSON.parse(localStorage.getItem("products") || "[]");
  products.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
}

// ADD PRODUCT
const addForm = document.getElementById("addForm");
if (addForm) {
  addForm.addEventListener("submit", e => {
    e.preventDefault();

    let products = JSON.parse(localStorage.getItem("products") || "[]");

    products.push({
      name: document.getElementById("name").value,
      price: document.getElementById("price").value,
      image: document.getElementById("image").value
    });

    localStorage.setItem("products", JSON.stringify(products));

    window.location.href = "product-list.html";
  });
}

// EDIT PRODUCT
const editForm = document.getElementById("editForm");
if (editForm) {
  let i = new URLSearchParams(window.location.search).get("i");
  let products = JSON.parse(localStorage.getItem("products") || "[]");

  document.getElementById("edit-name").value = products[i].name;
  document.getElementById("edit-price").value = products[i].price;
  document.getElementById("edit-image").value = products[i].image;

  editForm.addEventListener("submit", e => {
    e.preventDefault();

    products[i] = {
      name: document.getElementById("edit-name").value,
      price: document.getElementById("edit-price").value,
      image: document.getElementById("edit-image").value
    };

    localStorage.setItem("products", JSON.stringify(products));
    window.location.href = "product-list.html";
  });
}

loadProducts();
