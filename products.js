// product.js
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

const productContainer = document.getElementById("productContainer");
const categoryTitle = document.getElementById("categoryTitle");

if (categoryTitle) {
  categoryTitle.textContent = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "Products";
}

// Unique product names for each category
const productNames = {
  shirts: [
    "Cotton Breeze Shirt",
    "Royal Blue Formal",
    "Summer Check Classic",
    "Linen White Casual",
    "Skyline Slim Fit",
    "Heritage Striped",
    "Maroon Comfort Wear",
    "Ocean Mist Casual",
    "Golden Thread Shirt",
    "Urban Office Blue",
  ],
  jeans: [
    "Indigo Slim Fit",
    "Classic Stone Wash",
    "Jet Black Denim",
    "Vintage Blue Stretch",
    "Grey Cloud Jeans",
    "Sky Wash Fit",
    "Urban Fade Denim",
    "Rustic Blue Comfort",
    "Deep Indigo Stretch",
    "Navy Straight Fit",
  ],
  denimshirts: [
    "Indigo Classic Denim",
    "Stone Blue Shirt",
    "Washed Grey Denim",
    "Faded Sky Shirt",
    "Midnight Indigo Wear",
    "Rustic Blue Denim",
    "Jet Black Casual",
    "Vintage Fade Shirt",
    "Soft Wash Denim",
    "Steel Blue Fit",
  ],
  formalshirts: [
    "Executive White Shirt",
    "Royal Office Blue",
    "Striped Classic Formal",
    "Gentle Grey Shirt",
    "Premium Black Fit",
    "Light Sky Formal",
    "Elegant Cream Shirt",
    "Modern Pinstripe",
    "Charcoal Slim Fit",
    "Boardroom Classic",
  ],
  formalpants: [
    "Classic Black Trouser",
    "Charcoal Grey Formal",
    "Navy Tailored Fit",
    "Stone Brown Pant",
    "Elegant Blue Trouser",
    "Jet Black Stretch",
    "Olive Office Fit",
    "Premium Grey Pant",
    "Steel Blue Trouser",
    "Urban Cream Fit",
  ],
  baggypants: [
    "Urban Street Fit",
    "Comfort Grey Baggy",
    "Cargo Brown Loose",
    "Sky Denim Baggy",
    "Midnight Relaxed Fit",
    "Army Green Wide",
    "Trendy Beige Pant",
    "Everyday Lounge Fit",
    "Dusty Blue Baggy",
    "Soft Cotton Relaxed",
  ],
  cargopants: [
    "Combat Green Cargo",
    "Khaki Utility Pant",
    "Jet Black Cargo",
    "Desert Brown Fit",
    "Grey Pocket Style",
    "Navy Adventure Cargo",
    "Outdoor Beige Pant",
    "Urban Camo Fit",
    "Military Olive Cargo",
    "Steel Grey Utility",
  ],
  nightpants: [
    "Cozy Sleep Pant",
    "Midnight Blue Pyjama",
    "Cotton Dream Fit",
    "Soft Lounge Grey",
    "Comfort Nightwear",
    "Cloudy White Pyjama",
    "Star Print Pant",
    "Relax Navy Sleep",
    "Warm Winter Fit",
    "Classic Comfort Wear",
  ],
  sarees: [
    "Kanchipuram Silk Red",
    "Banarasi Gold Weave",
    "Mysore Silk Green",
    "Linen Floral Cream",
    "Fancy Party Saree",
    "Traditional Temple Border",
    "Royal Zari Blue",
    "Peach Georgette",
    "Cotton Heritage",
    "Golden Wedding Saree",
  ],
  tshirts: [
    "Classic White Tee",
    "Navy Polo Fit",
    "Street Graphic Black",
    "Summer Cotton Blue",
    "Everyday Comfort Tee",
    "Sport Active Grey",
    "Chill Mode Olive",
    "Trendy Print Red",
    "Breeze Fit Yellow",
    "Urban Style Brown",
  ],
};

function loadProducts() {
  if (!category) {
    productContainer.innerHTML =
      "<p style='text-align:center;color:#777;'>No category selected.</p>";
    return;
  }

  productContainer.innerHTML = "";

  const names = productNames[category] || [];
  const count = names.length || 10;

  for (let i = 1; i <= count; i++) {
    const name = names[i - 1] || `${category} ${i}`;
    const price = (i * 100) + 499;
    const imgPath = `images/${category}/${category}_${i}.jpg`;

    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${imgPath}" alt="${name}">
      <h3>${name}</h3>
      <p>₹${price}</p>
      <button onclick="addToCart('${category}', ${i}, ${price}, '${name}')">Add to Cart</button>
    `;
    productContainer.appendChild(card);
  }
}

function addToCart(category, index, price, name) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = { category, index, price, name, quantity: 1 };
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

loadProducts();
