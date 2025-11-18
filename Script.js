// --------------------------------------
//  Məhsulları LocalStorage-də saxlayan sistem
// --------------------------------------

function getProducts() {
    return JSON.parse(localStorage.getItem("products") || "[]");
}

function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

// --------------------------------------
//  Məhsul əlavə etmə funksiyası (add-product.html üçün)
// --------------------------------------

function addProduct() {
    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value.trim();
    const image = document.getElementById("productImage").value.trim();
    const desc = document.getElementById("productDesc").value.trim();

    if (!name || !price || !image) {
        alert("Zəhmət olmasa bütün xanaları doldurun!");
        return;
    }

    const products = getProducts();

    products.push({
        id: Date.now(),
        name,
        price,
        image,
        desc
    });

    saveProducts(products);

    alert("Məhsul əlavə olundu!");
    window.location.href = "index.html";
}

// --------------------------------------
//  Məhsulları siyahıda göstərmək (index.html üçün)
// --------------------------------------

function loadProducts() {
    const list = document.getElementById("productList");
    if (!list) return;

    const products = getProducts();
    list.innerHTML = "";

    products.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <h3>${p.name}</h3>
            <p>Qiymət: ${p.price} ₼</p>
            <img src="${p.image}" alt="Şəkil">
            <p>${p.desc || ""}</p>

            <button class="edit-btn" onclick="editProduct(${p.id})">Redaktə et</button>
            <button class="delete-btn" onclick="deleteProduct(${p.id})">Sil</button>
        `;

        list.appendChild(card);
    });
}

// --------------------------------------
//  Məhsul silmək
// --------------------------------------

function deleteProduct(id) {
    let products = getProducts();
    products = products.filter(p => p.id !== id);
    saveProducts(products);

    alert("Məhsul silindi!");
    loadProducts();
}

// --------------------------------------
//  Redaktə üçün məlumat saxla
// --------------------------------------

function editProduct(id) {
    localStorage.setItem("editID", id);
    window.location.href = "edit-product.html";
}

// --------------------------------------
//  Redaktə səhifəsini doldurmaq
// --------------------------------------

function loadEditPage() {
    const id = Number(localStorage.getItem("editID"));
    const products = getProducts();
    const product = products.find(p => p.id === id);

    if (!product) return;

    document.getElementById("editName").value = product.name;
    document.getElementById("editPrice").value = product.price;
    document.getElementById("editImage").value = product.image;
    document.getElementById("editDesc").value = product.desc;
}

// --------------------------------------
//  Redaktəni yadda saxlamaq
// --------------------------------------

function saveEdit() {
    const id = Number(localStorage.getItem("editID"));
    const products = getProducts();

    const index = products.findIndex(p => p.id === id);

    products[index].name = document.getElementById("editName").value;
    products[index].price = document.getElementById("editPrice").value;
    products[index].image = document.getElementById("editImage").value;
    products[index].desc = document.getElementById("editDesc").value;

    saveProducts(products);

    alert("Məhsul redaktə olundu!");
    window.location.href = "index.html";
}
