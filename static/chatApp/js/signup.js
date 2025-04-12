const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const successStep = document.getElementById("successStep");

const step1Indicator = document.getElementById("step1-indicator");
const step2Indicator = document.getElementById("step2-indicator");
const step3Indicator = document.getElementById("step3-indicator");
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");

const toStep2Button = document.getElementById("toStep2Button");
const toStep3Button = document.getElementById("toStep3Button");
const backToStep1Button = document.getElementById("backToStep1Button");
const backToStep2Button = document.getElementById("backToStep2Button");
const createAccountButton = document.getElementById("createAccountButton");
const goToLoginButton = document.getElementById("goToLoginButton");

// Form fields
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// Error messages
const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

// Event listeners
toStep2Button.addEventListener("click", function () {
  validateAndProceedToStep2();
});

backToStep1Button.addEventListener("click", function () {
  showStep(1);
});

toStep3Button.addEventListener("click", function () {
  validateAndProceedToStep3();
});

backToStep2Button.addEventListener("click", function () {
  showStep(2);
});

createAccountButton.addEventListener("click", function () {
  validateAndComplete();
});

goToLoginButton.addEventListener("click", function () {
  alert("Redirecting to login page...");
});

// Validation functions
function validateAndProceedToStep2() {
  let isValid = true;

  if (!firstName.value.trim()) {
    firstNameError.classList.remove("hidden");
    isValid = false;
  } else {
    firstNameError.classList.add("hidden");
  }

  if (!lastName.value.trim()) {
    lastNameError.classList.remove("hidden");
    isValid = false;
  } else {
    lastNameError.classList.add("hidden");
  }

  if (isValid) {
    showStep(2);
  }
}

function validateAndProceedToStep3() {
  let isValid = true;

  if (!username.value.trim()) {
    usernameError.classList.remove("hidden");
    isValid = false;
  } else {
    usernameError.classList.add("hidden");
  }

  if (!email.value.trim() || !isValidEmail(email.value)) {
    emailError.classList.remove("hidden");
    isValid = false;
  } else {
    emailError.classList.add("hidden");
  }

  if (isValid) {
    showStep(3);
  }
}

function validateAndComplete() {
  let isValid = true;

  if (!password.value || password.value.length < 8) {
    passwordError.classList.remove("hidden");
    isValid = false;
  } else {
    passwordError.classList.add("hidden");
  }

  if (!confirmPassword.value || confirmPassword.value !== password.value) {
    confirmPasswordError.classList.remove("hidden");
    isValid = false;
  } else {
    confirmPasswordError.classList.add("hidden");
  }

  if (isValid) {
    showSuccess();
  }
}

function isValidEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Navigation functions
function showStep(stepNumber) {
  // Hide all steps
  step1.classList.add("hidden");
  step2.classList.add("hidden");
  step3.classList.add("hidden");
  successStep.classList.add("hidden");

  // Reset all indicators
  step1Indicator.classList.remove("bg-primary", "text-white");
  step2Indicator.classList.remove("bg-primary", "text-white");
  step3Indicator.classList.remove("bg-primary", "text-white");
  step1Indicator.classList.add("bg-gray-300", "text-gray-600");
  step2Indicator.classList.add("bg-gray-300", "text-gray-600");
  step3Indicator.classList.add("bg-gray-300", "text-gray-600");
  line1.classList.remove("bg-primary");
  line2.classList.remove("bg-primary");
  line1.classList.add("bg-gray-300");
  line2.classList.add("bg-gray-300");

  // Show the requested step
  switch (stepNumber) {
    case 1:
      step1.classList.remove("hidden");
      step1.classList.add("bounce-in");
      step1Indicator.classList.remove("bg-gray-300", "text-gray-600");
      step1Indicator.classList.add("bg-primary", "text-white");
      break;
    case 2:
      step2.classList.remove("hidden");
      step2.classList.add("bounce-in");
      step1Indicator.classList.remove("bg-gray-300", "text-gray-600");
      step1Indicator.classList.add("bg-primary", "text-white");
      step2Indicator.classList.remove("bg-gray-300", "text-gray-600");
      step2Indicator.classList.add("bg-primary", "text-white");
      line1.classList.remove("bg-gray-300");
      line1.classList.add("bg-primary");
      break;
    case 3:
      step3.classList.remove("hidden");
      step3.classList.add("bounce-in");
      step1Indicator.classList.remove("bg-gray-300", "text-gray-600");
      step1Indicator.classList.add("bg-primary", "text-white");
      step2Indicator.classList.remove("bg-gray-300", "text-gray-600");
      step2Indicator.classList.add("bg-primary", "text-white");
      step3Indicator.classList.remove("bg-gray-300", "text-gray-600");
      step3Indicator.classList.add("bg-primary", "text-white");
      line1.classList.remove("bg-gray-300");
      line1.classList.add("bg-primary");
      line2.classList.remove("bg-gray-300");
      line2.classList.add("bg-primary");
      break;
  }
}

function showSuccess() {
  // Hide all steps
  step1.classList.add("hidden");
  step2.classList.add("hidden");
  step3.classList.add("hidden");

  // Show success message
  successStep.classList.remove("hidden");
  successStep.classList.add("bounce-in");
}
