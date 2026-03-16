// new
// Product Data with prices as numbers
const products = [
  {
    id: 1,
    name: "Diamond Solitaire Ring",
    category: "rings",
    price: 2999.0, // Now a number instead of string "$2,999"
    image:
      "https://alukas.presslayouts.com/wp-content/uploads/2023/02/home-default-banner-3.jpg",
    description:
      "Elegant solitaire ring featuring a brilliant-cut diamond set in 18k white gold.",
  },
  {
    id: 2,
    name: "Pearl Drop Necklace",
    category: "necklaces",
    price: 1599.0,
    image:
      "https://alukas.presslayouts.com/wp-content/uploads/2023/02/home-default-banner-2.jpg",
    description: "Sophisticated pearl necklace with 18k gold chain.",
  },
  {
    id: 3,
    name: "Gold Hoop Earrings",
    category: "earrings",
    price: 899.0,
    image:
      "https://alukas.presslayouts.com/wp-content/uploads/2023/02/home-default-banner-1.jpg",
    description: "Classic gold hoop earrings crafted from 14k yellow gold.",
  },
  {
    id: 4,
    name: "Tennis Bracelet",
    category: "bracelets",
    price: 3499.0,
    image:
      "https://alukas.presslayouts.com/wp-content/uploads/2023/02/home-default-banner-4.jpg",
    description:
      "Stunning tennis bracelet featuring lab-grown diamonds set in platinum.",
  },
  {
    id: 5,
    name: "Vintage Ruby Ring",
    category: "rings",
    price: 4299.0,
    image:
      "https://alukas.presslayouts.com/wp-content/uploads/2023/02/home-default-banner-5.jpg",
    description:
      "Exquisite vintage-inspired ring featuring a natural ruby surrounded by diamonds.",
  },

  {
    id: 6,
    name: "Emerald Pendant Necklace",
    category: "necklaces",
    price: "2199",
    image:
      "https://alukas.presslayouts.com/wp-content/uploads/2023/02/home-default-banner-2.jpg",
    description:
      "Beautiful emerald pendant necklace with 18k gold chain. Features a natural emerald in an elegant setting.",
  },
  {
    id: 7,
    name: "Diamond Stud Earrings",
    category: "earrings",
    price: "1799",
    image:
      "https://alukas.presslayouts.com/wp-content/uploads/2023/02/home-default-banner-1.jpg",
    description:
      "Classic diamond stud earrings in 14k white gold. Perfect for everyday elegance or special occasions.",
  },
  {
    id: 8,
    name: "Gold Chain Bracelet",
    category: "bracelets",
    price: "1299",
    image:
      "https://alukas.presslayouts.com/wp-content/uploads/2023/02/home-default-banner-4.jpg",
    description:
      "Sophisticated gold chain bracelet in 18k yellow gold. Versatile piece that adds elegance to any look.",
  },
];

// Cart Functions
let cart = JSON.parse(localStorage.getItem("luxeJewelryCart")) || [];

// Format price for display
function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  // Check if cart contains old string prices and migrate them
  if (cart.length > 0 && typeof cart[0].price === "string") {
    cart = cart.map((item) => ({
      ...item,
      price: parseFloat(item.price.replace(/[^0-9.]/g, "")),
      displayPrice: formatPrice(parseFloat(item.price.replace(/[^0-9.]/g, ""))),
    }));
  }

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
      displayPrice: formatPrice(product.price), // Store formatted version for display
    });
  }

  saveCart();
  updateCartCount();
  showCartNotification(product.name);
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  if (document.getElementById("cart-items-container")) {
    renderCartItems();
  }
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
  const item = cart.find((item) => item.id === productId);
  if (item && newQuantity > 0) {
    item.quantity = newQuantity;
    saveCart();
    if (document.getElementById("cart-items-container")) {
      renderCartItems();
    }
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("luxeJewelryCart", JSON.stringify(cart));
}

// Update cart count in navbar
function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = count;
  }
}

// Show notification when adding to cart
function showCartNotification(productName) {
  const notification = document.createElement("div");
  notification.className =
    "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center animate-fadeInOut";
  notification.innerHTML = `
    <i class="fas fa-check-circle mr-2"></i>
    ${productName} added to cart
  `;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Render cart items on cart page
function renderCartItems() {
  const container = document.getElementById("cart-items-container");
  const emptyMessage = document.getElementById("empty-cart-message");

  if (!container) return;

  if (cart.length === 0) {
    emptyMessage.classList.remove("hidden");
    container.innerHTML = "";
    updateCartTotals();
    return;
  }

  emptyMessage.classList.add("hidden");
  container.innerHTML = cart
    .map(
      (item) => `
    <div class="flex items-center border-b py-4" data-id="${item.id}">
      <img src="${item.image}" alt="${
        item.name
      }" class="w-24 h-24 object-cover rounded-lg mr-6">
      <div class="flex-1">
        <h3 class="font-semibold text-lg">${item.name}</h3>
        <p class="text-sm text-gray-500">${item.category}</p>
        <p class="font-bold gold-accent">${formatPrice(
          item.price * item.quantity
        )}</p>
        <div class="mt-2 flex items-center">
          <button class="decrease-btn bg-gray-200 px-3 py-1 rounded-l hover:bg-gray-300">−</button>
          <input type="number" value="${item.quantity}" min="1" 
            class="quantity-input w-16 text-center border-t border-b border-gray-300 py-1">
          <button class="increase-btn bg-gray-200 px-3 py-1 rounded-r hover:bg-gray-300">+</button>
          <button class="remove-btn ml-4 text-red-500 hover:text-red-700 text-sm">Remove</button>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  // Add event listeners
  document.querySelectorAll(".decrease-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemId = parseInt(e.target.closest("[data-id]").dataset.id);
      const item = cart.find((item) => item.id === itemId);
      if (item.quantity > 1) {
        updateQuantity(itemId, item.quantity - 1);
      }
    });
  });

  document.querySelectorAll(".increase-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemId = parseInt(e.target.closest("[data-id]").dataset.id);
      const item = cart.find((item) => item.id === itemId);
      updateQuantity(itemId, item.quantity + 1);
    });
  });

  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const newQuantity = parseInt(e.target.value);
      if (!isNaN(newQuantity) && newQuantity > 0) {
        const itemId = parseInt(e.target.closest("[data-id]").dataset.id);
        updateQuantity(itemId, newQuantity);
      } else {
        e.target.value = 1; // Reset to 1 if invalid input
      }
    });
  });

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemId = parseInt(e.target.closest("[data-id]").dataset.id);
      removeFromCart(itemId);
    });
  });

  updateCartTotals();
}

// Update cart totals on cart page
function updateCartTotals() {
  if (!document.getElementById("subtotal")) return;

  let subtotal = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
    totalItems += item.quantity;
  });

  const shipping = subtotal > 500 ? 0 : 10;
  const total = subtotal + shipping;

  document.getElementById("subtotal").textContent = formatPrice(subtotal);
  document.getElementById("shipping").textContent = formatPrice(shipping);
  document.getElementById("total").textContent = formatPrice(total);
  document.getElementById("checkout-btn").disabled = totalItems === 0;
}

// Initialize cart when page loads
document.addEventListener("DOMContentLoaded", function () {
  // Migrate any old cart data with string prices
  if (cart.length > 0 && typeof cart[0].price === "string") {
    cart = cart.map((item) => ({
      ...item,
      price: parseFloat(item.price.replace(/[^0-9.]/g, "")),
      displayPrice: formatPrice(parseFloat(item.price.replace(/[^0-9.]/g, ""))),
    }));
    saveCart();
  }

  // Initialize based on which page we're on
  if (document.getElementById("cart-items-container")) {
    renderCartItems();
  } else {
    updateCartCount();
  }
});

// Product Modal Functions
function showProductModal(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  document.getElementById("modal-title").textContent = product.name;
  document.getElementById("modal-image").src = product.image;
  document.getElementById("modal-image").alt = product.name;
  document.getElementById("modal-category").textContent =
    product.category.toUpperCase();
  document.getElementById("modal-name").textContent = product.name;
  document.getElementById("modal-price").textContent = formatPrice(
    product.price
  );
  document.getElementById("modal-description").textContent =
    product.description;

  // Update add to cart button
  const addToCartBtn = document.getElementById("add-to-cart-btn");
  if (addToCartBtn) {
    addToCartBtn.onclick = function () {
      addToCart(productId);
      closeModal();
    };
  }

  document.getElementById("product-modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("product-modal").classList.add("hidden");
}

// Add CSS for notification animation
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(10px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-10px); }
  }
  .animate-fadeInOut {
    animation: fadeInOut 3s ease-in-out forwards;
  }
`;
document.head.appendChild(style);
//
