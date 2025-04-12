// DOM elements
const loginForm = document.getElementById("loginForm");
const usernameOrEmail = document.getElementById("username-or-email");
const password = document.getElementById("password");
const identifierError = document.getElementById("identifierError");
const passwordError = document.getElementById("passwordError");
const loadingState = document.getElementById("loadingState");
const togglePassword = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");
const eyeSlashIcon = document.getElementById("eyeSlashIcon");

//global CSRFTOKEN
const CSRFTOKEN = document.querySelector("[name=csrfmiddlewaretoken]").value;
console.log("global: ", CSRFTOKEN);

// Toggle password visibility
togglePassword.addEventListener("click", function () {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  // Toggle eye icons
  eyeIcon.classList.toggle("hidden");
  eyeSlashIcon.classList.toggle("hidden");
});

// Form submission
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Reset error messages
  identifierError.classList.add("hidden");
  passwordError.classList.add("hidden");

  let isValid = true;

  // Validate username/email
  if (!usernameOrEmail.value.trim()) {
    identifierError.classList.remove("hidden");
    isValid = false;
  }

  // Validate password
  if (!password.value.trim()) {
    passwordError.classList.remove("hidden");
    isValid = false;
  }

  // if (isValid) {
  //   // Show loading state
  //   loadingState.classList.remove("hidden");

  //   // Simulate API call with timeout
  //   setTimeout(function () {
  //     // Hide loading state
  //     loadingState.classList.add("hidden");

  //     // For demo purpose, just alert success
  //     // In a real app, this would handle the API response
  //     // alert("Login successful! Redirecting to dashboard...");

  //     //data to send in the request
  //     const data = {
  //       username_or_email: usernameOrEmail,
  //       password: password,
  //     };

  //     //send post request to django backend
  //     fetch("/login/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-CSRFToken": CSRFTOKEN,
  //       },
  //       body: JSON.stringify(data),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         loadingState.classList.add("hidden");

  //         if (data.success) {
  //           alert("Login successfull!");
  //           window.location.href = "/signup/";
  //         } else {
  //           alert("Invalid username/email or password!");
  //         }
  //       })
  //       .catch((error) => {
  //         loadingState.classList.add("hidden");
  //         alert("An error occured. Please try again");
  //         console.error(error);
  //       });
  //   }, 1500);
  // }
});
