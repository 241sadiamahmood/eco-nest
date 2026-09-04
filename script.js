/* =====================================================
   ECOLife - INTERACTIVE HOMEPAGE
===================================================== */

/* =====================================================
   MOBILE MENU
===================================================== */

const mobileMenuBtn = document.getElementById("mobileMenuBtn");

const navMenu = document.getElementById("navMenu");

// mobileMenuBtn.addEventListener("click", () => {
//   navMenu.classList.toggle("show");

//   const icon = mobileMenuBtn.querySelector("i");

//   if (navMenu.classList.contains("show")) {
//     icon.classList.remove("fa-bars");
//     icon.classList.add("fa-xmark");
//   } else {
//     icon.classList.remove("fa-xmark");
//     icon.classList.add("fa-bars");
//   }
// });

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");

    const icon = mobileMenuBtn.querySelector("i");

    if (navMenu.classList.contains("show")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });
}

/* =====================================================
   SEARCH OVERLAY
===================================================== */

const searchBtn = document.getElementById("searchBtn");

const searchOverlay = document.getElementById("searchOverlay");

const closeSearch = document.getElementById("closeSearch");

const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
  searchOverlay.classList.add("show");

  setTimeout(() => {
    searchInput.focus();
  }, 300);
});

closeSearch.addEventListener("click", () => {
  searchOverlay.classList.remove("show");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    searchOverlay.classList.remove("show");
  }
});

/* Popular searches */

document.querySelectorAll(".popular-searches button").forEach((button) => {
  button.addEventListener("click", () => {
    searchInput.value = button.textContent;

    searchInput.focus();
  });
});

/* Search */

document.getElementById("searchSubmit").addEventListener("click", () => {
  const searchValue = searchInput.value.trim();

  if (searchValue === "") {
    showToast("Search", "Please enter a product name.");

    return;
  }

  showToast("Search", `Searching for "${searchValue}"...`);
});

/* =====================================================
   DARK / LIGHT MODE
===================================================== */

const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("ecolifeTheme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");

  themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");

  localStorage.setItem("ecolifeTheme", isDark ? "dark" : "light");

  if (isDark) {
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';

    showToast("Dark Mode", "Dark mode enabled.");
  } else {
    themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';

    showToast("Light Mode", "Light mode enabled.");
  }
});

/* =====================================================
   CART
===================================================== */

// let cart = JSON.parse(localStorage.getItem("econestCart")) || [];
// let cart = JSON.parse(localStorage.getItem("ecoLifeCart")) || [];
let cart = JSON.parse(localStorage.getItem("ecoLifeCart")) || [];

function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);

  document.querySelectorAll(".cart-count").forEach((badge) => {
    badge.textContent = total;
  });
}
// document.querySelectorAll(".add-cart").forEach(...)

function addToCart(product) {
  const existing = cart.find((item) => item.name === product.name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  // localStorage.setItem("econestCart", JSON.stringify(cart));
  // localStorage.setItem("ecoLifeCart", JSON.stringify(cart));
  localStorage.setItem("ecoLifeCart", JSON.stringify(cart));

  updateCartCount();

  showToast("Added to Cart", product.name);
}

updateCartCount();

/* =====================================================
   ADD TO CART BUTTONS
===================================================== */

document.querySelectorAll(".add-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");

    const product = {
      name: card.dataset.name,

      price: Number(card.dataset.price),

      category: card.dataset.category,

      image: card.dataset.image,
    };

    addToCart(product);

    const original = button.innerHTML;

    button.innerHTML = '<i class="fa-solid fa-check"></i> Added';

    button.style.background = "#4f7d4b";

    button.style.color = "white";

    setTimeout(() => {
      button.innerHTML = original;

      button.style.background = "";

      button.style.color = "";
    }, 1200);
  });
});

/* =====================================================
   WISHLIST
===================================================== */

let wishlist = JSON.parse(localStorage.getItem("ecolifeWishlist")) || [];

function updateWishlistCount() {
  document.querySelectorAll(".wishlist-count").forEach((badge) => {
    badge.textContent = wishlist.length;
  });
}

function updateWishlistButtons() {
  document.querySelectorAll(".product-card").forEach((card) => {
    const name = card.dataset.name;

    const button = card.querySelector(".product-wishlist");

    const icon = button.querySelector("i");

    if (wishlist.some((item) => item.name === name)) {
      button.classList.add("liked");

      icon.classList.remove("fa-regular");

      icon.classList.add("fa-solid");
    }
  });
}

document.querySelectorAll(".product-wishlist").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");

    const product = {
      name: card.dataset.name,

      price: Number(card.dataset.price),

      category: card.dataset.category,

      image: card.dataset.image,
    };

    const index = wishlist.findIndex((item) => item.name === product.name);

    const icon = button.querySelector("i");

    if (index === -1) {
      wishlist.push(product);

      button.classList.add("liked");

      icon.classList.remove("fa-regular");

      icon.classList.add("fa-solid");

      showToast("Wishlist", "Product added to wishlist.");
    } else {
      wishlist.splice(index, 1);

      button.classList.remove("liked");

      icon.classList.remove("fa-solid");

      icon.classList.add("fa-regular");

      showToast("Wishlist", "Product removed.");
    }

    localStorage.setItem("ecolifeWishlist", JSON.stringify(wishlist));

    updateWishlistCount();
  });
});

updateWishlistCount();
updateWishlistButtons();

/* =====================================================
   QUICK VIEW
===================================================== */

const modal = document.getElementById("quickModal");

const modalClose = document.getElementById("modalClose");

const modalImage = document.getElementById("modalImage");

const modalTitle = document.getElementById("modalTitle");

const modalCategory = document.getElementById("modalCategory");

const modalPrice = document.getElementById("modalPrice");

const modalCart = document.getElementById("modalCart");

let currentModalProduct = null;

document.querySelectorAll(".quick-view-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");

    currentModalProduct = {
      name: card.dataset.name,

      price: Number(card.dataset.price),

      category: card.dataset.category,

      image: card.dataset.image,
    };

    modalImage.src = currentModalProduct.image;

    modalImage.alt = currentModalProduct.name;

    modalTitle.textContent = currentModalProduct.name;

    modalCategory.textContent = currentModalProduct.category;

    modalPrice.textContent = `$${currentModalProduct.price.toFixed(2)}`;

    modal.classList.add("show");

    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  modal.classList.remove("show");

  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

modalCart.addEventListener("click", () => {
  if (currentModalProduct) {
    addToCart(currentModalProduct);

    closeModal();
  }
});

/* =====================================================
   TOAST NOTIFICATION
===================================================== */

const toast = document.getElementById("toast");

const toastTitle = document.getElementById("toastTitle");

const toastMessage = document.getElementById("toastMessage");

let toastTimer;

function showToast(title, message) {
  toastTitle.textContent = title;

  toastMessage.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

/* =====================================================
   COUNTER ANIMATION
===================================================== */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const counter = entry.target;

      const target = Number(counter.dataset.target);

      let current = 0;

      const increment = Math.max(1, Math.ceil(target / 80));

      const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
          current = target;

          clearInterval(timer);
        }

        counter.textContent = current.toLocaleString();
      }, 20);

      counterObserver.unobserve(counter);
    });
  },
  {
    threshold: 0.5,
  },
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

/* =====================================================
   REVIEW SLIDER
===================================================== */

const reviewsTrack = document.getElementById("reviewsTrack");

const reviewCards = document.querySelectorAll(".review-card");

const nextReview = document.getElementById("nextReview");

const prevReview = document.getElementById("prevReview");

const reviewDots = document.querySelectorAll(".review-dot");

let currentReview = 0;

function showReview(index) {
  if (index >= reviewCards.length) {
    currentReview = 0;
  } else if (index < 0) {
    currentReview = reviewCards.length - 1;
  } else {
    currentReview = index;
  }

  reviewsTrack.style.transform = `translateX(-${currentReview * 100}%)`;

  reviewDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentReview);
  });
}

nextReview.addEventListener("click", () => {
  showReview(currentReview + 1);
});

prevReview.addEventListener("click", () => {
  showReview(currentReview - 1);
});

reviewDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showReview(index);
  });
});

/* Automatic slider */

setInterval(() => {
  showReview(currentReview + 1);
}, 5000);

/* =====================================================
   NEWSLETTER
===================================================== */

const newsletterForm = document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = newsletterForm.querySelector("input");

  if (input.value.trim() === "") {
    return;
  }

  showToast("Welcome to EcoLife!", "Your 10% discount is on the way.");

  input.value = "";
});

/* =====================================================
   NAV LINK MOBILE CLOSE
===================================================== */

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");

    const icon = mobileMenuBtn.querySelector("i");

    icon.classList.remove("fa-xmark");

    icon.classList.add("fa-bars");
  });
});

/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements = document.querySelectorAll(
  ".category-card, .product-card, .guide-card, .benefit, .why-image",
);

revealElements.forEach((element) => {
  element.style.opacity = "0";

  element.style.transform = "translateY(25px)";

  element.style.transition = "opacity .7s ease, transform .7s ease";
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";

        entry.target.style.transform = "translateY(0)";

        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});
document.addEventListener("DOMContentLoaded", function () {
  // Get existing cart from localStorage
  let cart = JSON.parse(localStorage.getItem("ecoLifeCart")) || [];

  // Add product to cart
  document.querySelectorAll(".add-cart").forEach(function (button) {
    button.addEventListener("click", function () {
      const productCard = button.closest(".product-card");

      const product = {
        name: productCard.dataset.name,
        price: Number(productCard.dataset.price),
        category: productCard.dataset.category,
        image: productCard.dataset.image,
        quantity: 1,
      };

      // Check if product already exists
      const existingProduct = cart.find((item) => item.name === product.name);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push(product);
      }

      // Save cart
      localStorage.setItem("ecoLifeCart", JSON.stringify(cart));

      // Update cart number
      updateCartCount();

      alert(product.name + " added to cart!");
    });
  });

  // Update cart badge
  function updateCartCount() {
    const totalItems = cart.reduce(
      (total, item) => total + Number(item.quantity),
      0,
    );

    document.querySelectorAll(".cart-count").forEach(function (badge) {
      badge.textContent = totalItems;
    });
  }

  // Show saved cart count when page loads
  updateCartCount();
});
/* =====================================================
   LOGGED-IN USERNAME
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const usernameDisplay = document.getElementById("usernameDisplay");
  const loginLink = document.getElementById("loginLink");

  if (!usernameDisplay) return;

  const isLoggedIn = localStorage.getItem("ecoLifeLoggedIn");
  const savedUser = JSON.parse(localStorage.getItem("ecoLifeUser"));

  if (isLoggedIn === "true" && savedUser) {
    const fullName = `${savedUser.firstName} ${savedUser.lastName}`.trim();

    usernameDisplay.textContent = fullName;

    // Prevent clicking the username from opening login again
    if (loginLink) {
      loginLink.href = "#";
    }
  } else {
    usernameDisplay.textContent = "Login";
  }
});
