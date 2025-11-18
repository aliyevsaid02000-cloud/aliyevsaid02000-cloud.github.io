// Məhsulları LocalStorage-dən götür
function getProducts() {
    return JSON.parse(localStorage.getItem("products") || "[]");
}

// LocalStorage-yə yaz
function saveProducts(list) {
    localStorage.setItem("products", JSON.stringify(list));
}

// Məhsulları göstər (index.html-də)
if (document.getElementById("product-list")) {
    let products = getProducts();
    let list = document.getElementById("product-list");

    if (products.length === 0) {
        list.innerHTML = "<p style='color:white;'>Hələ məhsul yoxdur</p>";
    } else {
        products.forEach((p, i) => {
            list.innerHTML += `
                <div class="product-card">
                    <img src="${p.image || 'https://via.placeholder.com/150'}">
                    <h2>${p.name}</h2>
                    <p>${p.price} AZN</p>

                    <div class="actions">
                        <a href="edit-product.html?id=${i}" class="edit-btn">Redaktə</a>
                        <button class="delete-btn" onclick="deleteProduct(${i})">Sil</button>
                    </div>
                </div>
            `;
        });
    }
}

// Yeni məhsul əlavə et
if (document.getElementById("addForm")) {
    document.getElementById("addForm").addEventListener("submit", function (e) {
        e.preventDefault();

        let products = getProducts();

        products.push({
            name: document.getElementById("name").value,
            price: document.getElementById("price").value,
            image: document.getElementById("image").value
        });

        saveProducts(products);
        window.location.href = "index.html";
    });
}

// Məhsul sil
function deleteProduct(i) {
    let products = getProducts();
    products.splice(i, 1);
    saveProducts(products);
    location.reload();
}

// Redaktə səhifəsinə məlumatı yüklə
if (document.getElementById("editForm")) {
    let url = new URLSearchParams(window.location.search);
    let id = url.get("id");

    let products = getProducts();
    let product = products[id];

    document.getElementById("edit-name").value = product.name;
    document.getElementById("edit-price").value = product.price;
    document.getElementById("edit-image").value = product.image;

    document.getElementById("editForm").addEventListener("submit", function (e) {
        e.preventDefault();

        product.name = document.getElementById("edit-name").value;
        product.price = document.getElementById("edit-price").value;
        product.image = document.getElementById("edit-image").value;

        products[id] = product;
        saveProducts(products);

        window.location.href = "index.html";
    });
}
