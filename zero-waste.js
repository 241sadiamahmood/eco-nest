/* =========================================
   ECOLIFE ZERO WASTE GUIDE
========================================= */

/* =========================================
   MOBILE NAVIGATION
========================================= */

const mobileMenu = document.getElementById("mobileMenu");

const navLinks = document.getElementById("navLinks");

if (mobileMenu) {
  mobileMenu.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });
}

/* =========================================
   WISHLIST
========================================= */

const wishlistBtn = document.getElementById("wishlistBtn");

if (wishlistBtn) {
  wishlistBtn.addEventListener("click", function () {
    this.classList.toggle("liked");

    if (this.classList.contains("liked")) {
      this.textContent = "♥";

      alert("Added to your wishlist ❤️");
    } else {
      this.textContent = "♡";
    }
  });
}

/* =========================================
   ROOM GUIDE TIPS
========================================= */

function toggleTips(button) {
  const tips = button.nextElementSibling;

  tips.classList.toggle("show");

  if (tips.classList.contains("show")) {
    button.textContent = "Hide Tips −";
  } else {
    if (button.textContent.includes("Kitchen")) {
      button.textContent = "View Kitchen Tips +";
    } else if (button.textContent.includes("Bathroom")) {
      button.textContent = "View Bathroom Tips +";
    } else {
      button.textContent = "View Shopping Tips +";
    }
  }
}

/* =========================================
   7 DAY ZERO WASTE CHALLENGE
========================================= */

let completedDays = 0;

function completeDay(card) {
  card.classList.toggle("completed");

  if (card.classList.contains("completed")) {
    completedDays++;
  } else {
    completedDays--;
  }

  const percentage = (completedDays / 7) * 100;

  const progressFill = document.getElementById("progressFill");

  const progressText = document.getElementById("progressText");

  progressFill.style.width = percentage + "%";

  progressText.textContent = completedDays + " of 7 days completed";

  if (completedDays === 7) {
    setTimeout(function () {
      alert(
        "🌿 Congratulations!\n\nYou completed the EcoLife 7-Day Zero Waste Challenge!",
      );
    }, 300);
  }
}

/* =========================================
   FAQ ACCORDION
========================================= */

function toggleFaq(button) {
  const faqItem = button.parentElement;

  const symbol = button.querySelector("span");

  faqItem.classList.toggle("open");

  if (faqItem.classList.contains("open")) {
    symbol.textContent = "−";
  } else {
    symbol.textContent = "+";
  }
}

/* =========================================
   CART COUNTER
========================================= */

let cartCount = 0;

const cartCounter = document.getElementById("cartCount");

if (cartCounter) {
  cartCounter.textContent = cartCount;
}
