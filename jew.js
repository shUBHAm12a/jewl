const products = [
  {
    id: 1,
    name: "Diamond Solitaire Ring",
    category: "rings",
    price: "2999",
    image:
      "https://alukas.presslayouts.com/wp-content/uploads/2023/02/home-default-banner-3.jpg",
    description:
      "Elegant solitaire ring featuring a brilliant-cut diamond set in 18k white gold. Perfect for engagements and special occasions.",
  },
  {
    id: 2,
    name: "Pearl Drop Necklace",
    category: "necklaces",
    price: "1599",
    image:
      "https://alukas.presslayouts.com/wp-content/uploads/2023/02/home-default-banner-2.jpg",
    description:
      "Sophisticated pearl necklace with 18k gold chain. Features lustrous freshwater pearls in a classic drop design.",
  },
  {
    id: 3,
    name: "Gold Hoop Earrings",
    category: "earrings",
    price: "899",
    image:
      "https://alukas.presslayouts.com/wp-content/uploads/2023/02/home-default-banner-1.jpg",
    description:
      "Classic gold hoop earrings crafted from 14k yellow gold. Timeless design that complements any outfit.",
  },
  {
    id: 4,
    name: "Tennis Bracelet",
    category: "bracelets",
    price: "3499",
    image:
      "https://alukas.presslayouts.com/wp-content/uploads/2023/02/home-default-banner-4.jpg",
    description:
      "Stunning tennis bracelet featuring lab-grown diamonds set in platinum. A statement piece for special occasions.",
  },
  {
    id: 5,
    name: "Vintage Ruby Ring",
    category: "rings",
    price: "4299",
    image:
      "https://alukas.presslayouts.com/wp-content/uploads/2023/02/home-default-banner-5.jpg",
    description:
      "Exquisite vintage-inspired ring featuring a natural ruby surrounded by diamonds in 18k rose gold setting.",
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
    price: "1,299",
    image:
      "https://alukas.presslayouts.com/wp-content/uploads/2023/02/home-default-banner-4.jpg",
    description:
      "Sophisticated gold chain bracelet in 18k yellow gold. Versatile piece that adds elegance to any look.",
  },

  {
    id: 9,
    name: "Gold Chain Bracelet",
    category: "bracelets",
    price: "1,299",
    image:
      "https://alukas.presslayouts.com/wp-content/uploads/2023/02/home-default-banner-4.jpg",
    description:
      "Sophisticated gold chain bracelet in 18k yellow gold. Versatile piece that adds elegance to any look.",
  },
];

// Navigation functionality
function showSection(sectionId) {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });

  document.getElementById(sectionId).classList.add("active");

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });

  event.target.classList.add("active");

  if (sectionId === "products") {
    loadProducts();
  }

  if (sectionId === "home") {
    loadFeaturedProducts();
  }
}

function loadFeaturedProducts() {
  const container = document.getElementById("featured-products");
  const featuredProducts = products.slice(0, 4);

  container.innerHTML = featuredProducts
    .map(
      (product) => `
        <div class="product-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" onclick="showProductModal(${
          product.id
        })">
          <div class="relative">
            <img src="${product.image}" alt="${
        product.name
      }" class="w-full h-64 object-cover">
            <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300"></div>
          </div>
          <div class="p-6">
            <p class="text-sm text-gray-500 mb-2">${product.category.toUpperCase()}</p>
            <h3 class="font-semibold text-lg mb-2">${product.name}</h3>
            <p class="text-xl font-bold gold-accent">${product.price}</p>
          </div>
        </div>
      `
    )
    .join("");
}

function loadProducts(category = "all") {
  const container = document.getElementById("product-grid");
  const filteredProducts =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  container.innerHTML = filteredProducts
    .map(
      (product) => `
        <div class="product-card bg-white rounded-lg shadow-md overflow-hidden">
          <div class="relative">
            <img src="${product.image}" alt="${
        product.name
      }" class="w-full h-64 object-cover">
            <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300"></div>
            <div class="absolute top-4 right-4">
              <button class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gold hover:text-white transition">
                <i class="fas fa-heart"></i>
              </button>
            </div>
          </div>
          <div class="p-6">
            <p class="text-sm text-gray-500 mb-2">${product.category.toUpperCase()}</p>
            <h3 class="font-semibold text-lg mb-2">${product.name}</h3>
            <p class="text-xl font-bold gold-accent mb-4">₹${product.price}</p>
            <button onclick="showProductModal(${
              product.id
            })" class="w-full bg-gold text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition">
              Quick View
            </button>
          </div>
        </div>
      `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".product-filter").forEach((filter) => {
    filter.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelectorAll(".product-filter").forEach((f) => {
        f.classList.remove("active", "border-gold", "text-gold");
        f.classList.add("border-transparent", "text-gray-500");
      });

      this.classList.add("active", "border-gold", "text-gold");
      this.classList.remove("border-transparent", "text-gray-500");

      const category = this.getAttribute("data-category");
      loadProducts(category);
    });
  });

  loadFeaturedProducts();
});

function showProductModal(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  document.getElementById("modal-title").textContent = "Product Details";
  document.getElementById("modal-image").src = product.image;
  document.getElementById("modal-image").alt = product.name;
  document.getElementById("modal-category").textContent =
    product.category.toUpperCase();
  document.getElementById("modal-name").textContent = product.name;
  document.getElementById("modal-price").textContent = product.price;
  document.getElementById("modal-description").textContent =
    product.description;

  document.getElementById("add-to-cart-btn").onclick = function () {
    addToCart(productId);
  };

  document.getElementById("product-modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("product-modal").classList.add("hidden");
}

document
  .getElementById("product-modal")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      closeModal();
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  });

  document.querySelectorAll(".product-card, .bg-white").forEach((el) => {
    observer.observe(el);
  });
});

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("luxeJewelryCart")) || [];
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("luxeJewelryCart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("luxeJewelryCart")) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-count").textContent = count;
}

document.addEventListener("DOMContentLoaded", updateCartCount);

// jew js

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("luxeJewelryCart")) || [];

  const alreadyExists = cart.some((item) => item.id === product.id);
  if (alreadyExists) {
    alert("Product already in cart!");
    return;
  }

  cart.push({ ...product, quantity: 1 });
  localStorage.setItem("luxeJewelryCart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("luxeJewelryCart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}

document.addEventListener("DOMContentLoaded", updateCartCount);
//

let currentModalProductId = null;

function showProductModal(productId) {
  currentModalProductId = productId; // 👈 Store product ID for use in button

  const product = products.find((p) => p.id === productId);
  if (!product) return;

  // Fill modal content as you're already doing...
  document.getElementById("modal-title").textContent = "Product Details";
  document.getElementById("modal-image").src = product.image;
  document.getElementById("modal-image").alt = product.name;
  document.getElementById("modal-category").textContent =
    product.category.toUpperCase();
  document.getElementById("modal-name").textContent = product.name;
  document.getElementById("modal-price").textContent = product.price;
  document.getElementById("modal-description").textContent =
    product.description;

  document.getElementById("product-modal").classList.remove("hidden");
}

// responsive
// Mobile menu toggle
document
  .getElementById("mobile-menu-toggle")
  .addEventListener("click", function () {
    const mobileMenu = document.getElementById("mobile-menu");
    const icon = this.querySelector("i");

    // Toggle menu visibility
    mobileMenu.classList.toggle("hidden");

    // Change icon between bars and X
    if (mobileMenu.classList.contains("hidden")) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    } else {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    }
  });
