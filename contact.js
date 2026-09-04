/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    alert(
      "🌿 Thank you for contacting EcoLife!\n\n" +
        "Your message has been received.",
    );

    contactForm.reset();
  });
}

/* =====================================================
   NEWSLETTER
===================================================== */

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    alert("🌱 Thank you for subscribing to EcoLife!");

    newsletterForm.reset();
  });
}

/* =====================================================
   REGISTRATION
===================================================== */

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("registerName").value;

    const email = document.getElementById("registerEmail").value;

    const password = document.getElementById("registerPassword").value;

    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("❌ Passwords do not match.");

      return;
    }

    const user = {
      name: name,

      email: email,

      password: password,
    };

    localStorage.setItem("ecoLifeUser", JSON.stringify(user));

    alert("🌿 Account created successfully!");

    window.location.href = "login.html";
  });
}

/* =====================================================
   LOGIN
===================================================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;

    const password = document.getElementById("loginPassword").value;

    const savedUser = localStorage.getItem("ecoLifeUser");

    if (!savedUser) {
      alert("❌ No account found.\n\n" + "Please create an account first.");

      return;
    }

    const user = JSON.parse(savedUser);

    if (email === user.email && password === user.password) {
      alert("🌿 Welcome back, " + user.name + "!");

      window.location.href = "products.html";
    } else {
      alert("❌ Incorrect email or password.");
    }
  });
}
