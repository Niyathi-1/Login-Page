const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const formMessage = document.getElementById("formMessage");
const toggleBtn = document.getElementById("togglePassword");
const submitBtn = form.querySelector('button[type="submit"]');

// Demo credentials (front-end only, not secure)
const DEMO_EMAIL = "demo@example.com";
const DEMO_PASSWORD = "Password123";

function setError(input, errorEl, message) {
  errorEl.textContent = message;
  input.classList.toggle("invalid", Boolean(message));
}

function validate() {
  let valid = true;
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email) {
    setError(emailInput, emailError, "Email is required");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError(emailInput, emailError, "Enter a valid email address");
    valid = false;
  } else {
    setError(emailInput, emailError, "");
  }

  if (!password) {
    setError(passwordInput, passwordError, "Password is required");
    valid = false;
  } else if (password.length < 8) {
    setError(passwordInput, passwordError, "Password must be at least 8 characters");
    valid = false;
  } else {
    setError(passwordInput, passwordError, "");
  }

  return valid;
}

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = "form-message " + type;
}

toggleBtn.addEventListener("click", () => {
  const showing = passwordInput.type === "text";
  passwordInput.type = showing ? "password" : "text";
  toggleBtn.textContent = showing ? "Show" : "Hide";
  toggleBtn.setAttribute("aria-label", showing ? "Show password" : "Hide password");
});

emailInput.addEventListener("input", () => setError(emailInput, emailError, ""));
passwordInput.addEventListener("input", () => setError(passwordInput, passwordError, ""));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.className = "form-message";

  if (!validate()) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Logging in...";

  // Simulate a short server delay
  setTimeout(() => {
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      showMessage("Login successful! Redirecting...", "success-msg");
      // window.location.href = "dashboard.html";
    } else {
      showMessage("Incorrect email or password", "error-msg");
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Login";
  }, 800);
});