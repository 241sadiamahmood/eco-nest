/* =====================================================
   ECOLife - INTERACTIVE HOMEPAGE
===================================================== */

/* =====================================================
   MOBILE MENU
===================================================== */

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");

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

if (searchBtn && searchOverlay && searchInput) {
  searchBtn.addEventListener("click", () => {
    searchOverlay.classList.add("show");

    setTimeout(() => {
      searchInput.focus();
    }, 300);
  });
}

if (closeSearch && searchOverlay) {
  closeSearch.addEventListener("click", () => {
    searchOverlay.classList.remove("show");
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && searchOverlay) {
    searchOverlay.classList.remove("show");
  }
});

/* Popular searches */

document.querySelectorAll(".popular-searches button").forEach((button) => {
  button.addEventListener("click", () => {
    if (searchInput) {
      searchInput.value = button.textContent;
      searchInput.focus();
    }
  });
});

/* Search */

const searchSubmit = document.getElementById("searchSubmit");

if (searchSubmit) {
  searchSubmit.addEventListener("click", () => {
    const searchValue = searchInput ? searchInput.value.trim() : "";

    if (searchValue === "") {
      showToast("Search", "Please enter a product name.");
      return;
    }

    showToast("Search", `Searching for "${searchValue}"...`);
  });
}

/* =====================================================
   DARK / LIGHT MODE
===================================================== */

const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("ecolifeTheme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");

  if (themeBtn) {
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
}

if (themeBtn) {
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
}

/* =====================================================
   CART
===================================================== */

let cart = JSON.parse(localStorage.getItem("ecoLifeCart")) || [];

function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

  document.querySelectorAll(".cart-count").forEach((badge) => {
    badge.textContent = total;
  });
}

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

    if (!card) return;

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

    if (!button) return;

    const icon = button.querySelector("i");

    if (!icon) return;

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

    if (!card) return;

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

    if (!card || !modal) return;

    currentModalProduct = {
      name: card.dataset.name,
      price: Number(card.dataset.price),
      category: card.dataset.category,
      image: card.dataset.image,
    };

    if (modalImage) {
      modalImage.src = currentModalProduct.image;
      modalImage.alt = currentModalProduct.name;
    }

    if (modalTitle) {
      modalTitle.textContent = currentModalProduct.name;
    }

    if (modalCategory) {
      modalCategory.textContent = currentModalProduct.category;
    }

    if (modalPrice) {
      modalPrice.textContent = `$${currentModalProduct.price.toFixed(2)}`;
    }

    modal.classList.add("show");

    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  if (!modal) return;

  modal.classList.remove("show");

  document.body.style.overflow = "";
}

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

if (modalCart) {
  modalCart.addEventListener("click", () => {
    if (currentModalProduct) {
      addToCart(currentModalProduct);

      closeModal();
    }
  });
}

/* =====================================================
   TOAST NOTIFICATION
===================================================== */

const toast = document.getElementById("toast");
const toastTitle = document.getElementById("toastTitle");
const toastMessage = document.getElementById("toastMessage");

let toastTimer;

function showToast(title, message) {
  if (!toast || !toastTitle || !toastMessage) return;

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

if (counters.length > 0) {
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
}

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
  if (!reviewsTrack || reviewCards.length === 0) {
    return;
  }

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

if (nextReview) {
  nextReview.addEventListener("click", () => {
    showReview(currentReview + 1);
  });
}

if (prevReview) {
  prevReview.addEventListener("click", () => {
    showReview(currentReview - 1);
  });
}

reviewDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showReview(index);
  });
});

if (reviewCards.length > 0) {
  setInterval(() => {
    showReview(currentReview + 1);
  }, 5000);
}

/* =====================================================
   NEWSLETTER
===================================================== */

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = newsletterForm.querySelector("input");

    if (!input || input.value.trim() === "") {
      return;
    }

    showToast("Welcome to EcoLife!", "Your 10% discount is on the way.");

    input.value = "";
  });
}

/* =====================================================
   NAV LINK MOBILE CLOSE
===================================================== */

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu) {
      navMenu.classList.remove("show");
    }

    if (mobileMenuBtn) {
      const icon = mobileMenuBtn.querySelector("i");

      if (icon) {
        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");
      }
    }
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

if (revealElements.length > 0) {
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
}

/* =====================================================
   LOGGED-IN USER + DROPDOWN
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const usernameDisplay = document.getElementById("usernameDisplay");

  const userMenu = document.getElementById("userMenu");

  const userMenuBtn = document.getElementById("userMenuBtn");

  const userDropdown = document.getElementById("userDropdown");

  const logoutBtn = document.getElementById("logoutBtn");

  const registerLink = document.getElementById("registerLink");

  /*
       If the new user-menu HTML
       is not present, stop here.
    */

  if (!usernameDisplay || !userMenu || !userMenuBtn) {
    return;
  }

  /* Check login status */

  const isLoggedIn = localStorage.getItem("ecoLifeLoggedIn") === "true";

  /* Get registered user */

  let savedUser = null;

  try {
    savedUser = JSON.parse(localStorage.getItem("ecoLifeUser"));
  } catch (error) {
    savedUser = null;
  }

  /* =================================================
       USER IS LOGGED IN
    ================================================= */

  if (isLoggedIn && savedUser) {
    const fullName = `${savedUser.firstName || ""} ${
      savedUser.lastName || ""
    }`.trim();

    /*
         Show username
      */

    usernameDisplay.textContent =
      fullName || localStorage.getItem("ecoLifeUsername") || "User";

    /*
         Hide Register button
      */

    if (registerLink) {
      registerLink.style.display = "none";
    }

    /*
         Open / close dropdown
      */

    userMenuBtn.addEventListener("click", function (event) {
      event.stopPropagation();

      userMenu.classList.toggle("open");
    });

    /*
         Close dropdown when
         clicking outside
      */

    document.addEventListener("click", function (event) {
      if (!userMenu.contains(event.target)) {
        userMenu.classList.remove("open");
      }
    });

    /*
         Close dropdown with Escape
      */

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        userMenu.classList.remove("open");
      }
    });

    /*
         LOGOUT
      */

    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        /*
               Remove ONLY login session data.

               Cart and wishlist are NOT removed.
            */

        localStorage.removeItem("ecoLifeLoggedIn");

        localStorage.removeItem("ecoLifeEmail");

        localStorage.removeItem("ecoLifeUsername");

        /*
               Go back to login page
            */

        window.location.href = "login.html";
      });
    }
  } else {
    /* =================================================
         USER IS NOT LOGGED IN
      ================================================= */

    usernameDisplay.textContent = "Login";

    /*
         Hide dropdown
      */

    if (userDropdown) {
      userDropdown.style.display = "none";
    }

    /*
         Clicking Login goes to login.html
      */

    userMenuBtn.addEventListener("click", function () {
      window.location.href = "login.html";
    });
  }
});
