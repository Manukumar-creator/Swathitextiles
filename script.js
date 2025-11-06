function openProductDetails(productId, category) {
  localStorage.setItem("selectedProductId", productId);
  localStorage.setItem("selectedCategory", category);
  window.location.href = "product-details.html";
}

function loadProductDetails() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const category = localStorage.getItem("selectedCategory");
  const productId = localStorage.getItem("selectedProductId");

  const product = products.find(p => p.id == productId);
  const productDetails = document.getElementById("productDetails");
  const similarContainer = document.getElementById("similarProducts");

  if (!product) {
    productDetails.innerHTML = "<p>Product not found.</p>";
    return;
  }

  // Product info
  productDetails.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <div class="product-info">
      <h2>${product.name}</h2>
      <p><strong>Price:</strong> ₹${product.price}</p>
      <button onclick='addToCart(${product.id})'>Add to Cart</button>
    </div>
  `;

  // Similar products from same category
  const similar = products.filter(p => p.category === category && p.id != productId);

  similar.forEach(item => {
    const div = document.createElement("div");
    div.className = "similar-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h4>${item.name}</h4>
      <p>₹${item.price}</p>
    `;
    div.onclick = () => openProductDetails(item.id, item.category);
    similarContainer.appendChild(div);
  });
}
