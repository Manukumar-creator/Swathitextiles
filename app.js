/* app.js - central JS for Swathi Textiles */
const app = (function() {
  // categories must match your image folder names
  const categories = ['sarees','jeans','shirts','tshirts','formalshirts','denimshirts','baggypants','cargopants','formalpants','nightpants'];

  // build an array of all products (20 each)
  function buildProductsArray() {
    const arr = [];
    categories.forEach(cat => {
      for (let i=1;i<=20;i++){
        const id = `${cat}_${i}`; // unique id
        const name = `${capitalize(cat)} ${i}`;
        const price = 399 + (i * 100); // simple pricing
        const image = `images/${cat}/${cat}_${i}.jpg`;
        arr.push({ id, category: cat, name, price, image });
      }
    });
    return arr;
  }

  // small helper
  function capitalize(s){ return s.charAt(0).toUpperCase() + s.slice(1) }

  // CART helpers (localStorage)
  function getCart(){ return JSON.parse(localStorage.getItem('cart') || '[]') }
  function setCart(cart){ localStorage.setItem('cart', JSON.stringify(cart)); updateCartCount(); renderQuickCart('quickCart'); }

  function addToCart(item){
    const cart = getCart();
    const found = cart.find(i=>i.id===item.id);
    if (found) found.quantity += 1;
    else cart.push({...item, quantity:1});
    setCart(cart);
    alert('Added to cart!');
  }

  // add by product id
  function addToCartById(id){
    const products = buildProductsArray();
    const p = products.find(x=>x.id===id);
    if (!p) return alert('Product not found');
    addToCart(p);
  }

  function changeQuantity(index, delta){
    const cart = getCart();
    if (!cart[index]) return;
    cart[index].quantity += delta;
    if (cart[index].quantity < 1) cart[index].quantity = 1;
    setCart(cart);
    // re-render cart if on cart page
    if (document.querySelector('#cartTable')) {
      window.renderCart && window.renderCart(); // cart page exposes renderCart
    }
  }

  function removeFromCart(index){
    const cart = getCart();
    cart.splice(index,1);
    setCart(cart);
    if (document.querySelector('#cartTable')) {
      window.renderCart && window.renderCart();
    }
  }

  function addToCartObject(obj){
    addToCart(obj);
  }

  function addToCartQuick(id){
    addToCartById(id);
  }

  function updateCartCount(){
    const c = getCart();
    const el = document.querySelectorAll('#cartCount');
    el.forEach(node => node.textContent = c.length);
  }

  function renderQuickCart(containerId){
    const cont = document.getElementById(containerId);
    if (!cont) return;
    const cart = getCart();
    if (!cart.length) { cont.innerHTML = '<p class="empty-cart">No items in cart.</p>'; return; }
    cont.innerHTML = cart.slice(0,5).map(it=>`
      <div style="display:flex;align-items:center;margin-bottom:8px;">
        <img src="${it.image}" style="width:48px;height:48px;object-fit:cover;border-radius:6px;margin-right:8px"/>
        <div><strong style="font-size:14px">${it.name}</strong><br/><small>Qty: ${it.quantity}</small></div>
      </div>
    `).join('');
  }

  function getCategories(){ return categories.slice() }

  // view product (go to product details)
  function viewProduct(id){
    window.location.href = `product-details.html?id=${encodeURIComponent(id)}`;
  }

  return {
    buildProductsArray,
    getCategories,
    addToCartById,
    addToCart: addToCartObject,
    getCart,
    setCart,
    changeQuantity,
    removeFromCart,
    renderQuickCart,
    updateCartCount,
    viewProduct,
    addToCartQuick
  };
})();

// Expose some functions to global scope for pages to use easily
window.app = app;
window.addToCartById = app.addToCartById;
window.changeQuantity = app.changeQuantity;
window.removeFromCart = app.removeFromCart;
window.updateCartCount = app.updateCartCount;
window.renderQuickCart = app.renderQuickCart;
window.getCart = app.getCart;
window.viewProduct = app.viewProduct;
