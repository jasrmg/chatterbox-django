// Right sidebar toggle
const infoButton = document.getElementById("info-button");
const rightSidebar = document.querySelector(".right-sidebar");
const mainContent = document.querySelector(".main-content");

infoButton.addEventListener("click", () => {
  rightSidebar.classList.toggle("hidden");
  adjustMainContentSize();
});

// Function to adjust main content size
function adjustMainContentSize() {
  if (window.innerWidth >= 768) {
    // Only for desktop
    // if (rightSidebar.classList.contains("hidden")) {
    //   mainContent.classList.remove("md:pr-80");
    // } else {
    //   mainContent.classList.add("md:pr-80");
    // }
  }
}

// Handle Media/Files dropdown change
const mediaFilesDropdown = document.getElementById("media-files-dropdown");
const mediaContent = document.getElementById("media-content");
const filesContent = document.getElementById("files-content");

mediaFilesDropdown.addEventListener("change", () => {
  if (mediaFilesDropdown.value === "media") {
    mediaContent.classList.remove("hidden");
    filesContent.classList.add("hidden");
  } else {
    mediaContent.classList.add("hidden");
    filesContent.classList.remove("hidden");
  }
});

// Mute modal functionality
const muteButton = document.getElementById("mute-button");
const muteModal = document.getElementById("mute-modal");
const muteModalClose = document.getElementById("mute-modal-close");
const cancelMute = document.getElementById("cancel-mute");

muteButton.addEventListener("click", () => {
  muteModal.classList.remove("opacity-0");
  muteModal.classList.remove("pointer-events-none");
});

function closeMuteModal() {
  muteModal.classList.add("opacity-0");
  muteModal.classList.add("pointer-events-none");
}

muteModalClose.addEventListener("click", closeMuteModal);
cancelMute.addEventListener("click", closeMuteModal);

// Close modal when clicking outside
muteModal.addEventListener("click", (e) => {
  if (e.target === muteModal) {
    closeMuteModal();
  }
});

// Handle window resize
window.addEventListener("resize", adjustMainContentSize);

// Initial setup
adjustMainContentSize();

// Import existing functionality for the left sidebar and messaging
// Profile Modal Functionality
const profileTrigger = document.getElementById("profile-trigger");
const profileModal = document.getElementById("profile-modal");
const modalClose = document.getElementById("modal-close");

profileTrigger.addEventListener("click", () => {
  profileModal.classList.remove("opacity-0");
  profileModal.classList.remove("pointer-events-none");
});
modalClose.addEventListener("click", () => {
  profileModal.classList.add("opacity-0");
  profileModal.classList.add("pointer-events-none");
});
//close modal when clicking outside
profileModal.addEventListener("click", (e) => {
  if (e.target === profileModal) {
    profileModal.classList.add("opacity-0");
    profileModal.classList.add("pointer-events-none");
  }
});

// Mobile menu toggle
const menuButton = document.getElementById("menu-button");
const sidebar = document.querySelector(".left-sidebar");

menuButton.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
});

// Hide sidebar by default on mobile
if (window.innerWidth < 768) {
  sidebar.classList.add("hidden");
  sidebar.classList.add("absolute");
  sidebar.classList.add("z-10");
  sidebar.classList.add("h-full");
  sidebar.classList.add("w-80");
}

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    sidebar.classList.add("hidden");
    sidebar.classList.add("absolute");
    sidebar.classList.add("z-10");
    sidebar.classList.add("h-full");
    sidebar.classList.add("w-80");
  } else {
    sidebar.classList.remove("hidden");
    sidebar.classList.remove("absolute");
    sidebar.classList.remove("z-10");
  }
});

// Message input and sending functionality
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const messagesContainer = document.getElementById("messages-container");

// Function to handle sending messages
function sendMessage() {
  const messageText = messageInput.innerText.trim();
  if (messageText) {
    // Get current time
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const timeString = `${formattedHours}:${minutes} ${ampm}`;

    // Create new message element
    const newMessage = document.createElement("div");
    newMessage.className = "flex items-end justify-end mt-4";
    newMessage.innerHTML = `
          <div class="bg-primary rounded-lg rounded-br-none px-4 py-2 max-w-xs md:max-w-md shadow">
          <p class="font-robot text-sm text-white">${messageText}</p>
          <p class="text-xs text-white opacity-70 mt-1">${timeString}</p>
        </div>
        `;
    messagesContainer.appendChild(newMessage);
    messageInput.innerText = "";
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}
sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

const radioButtons = document.querySelectorAll('input[name="mute-duration"]');

// Listen for changes in the radio buttons
radioButtons.forEach((button) => {
  button.addEventListener("change", () => {
    // When a radio button is selected, perform any action you need
    console.log(`Mute duration set to: ${button.value}`);
  });
});

//logout modal:
document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logout-button");
  const logoutModal = document.getElementById("logout-modal");
  const closeModalButton = document.getElementById("close-modal");
  const cancelLogoutButton = document.getElementById("cancel-logout");
  const confirmLogoutButton = document.getElementById("confirm-logout");

  // Function to open the modal
  function openModal() {
    logoutModal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  }

  // Function to close the modal
  function closeModal() {
    logoutModal.classList.add("hidden");
    document.body.style.overflow = ""; // Restore scrolling
  }

  // Show the modal when logout button is clicked
  logoutButton.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent event from bubbling up
    openModal();
  });

  // Close the modal when close button is clicked
  closeModalButton.addEventListener("click", closeModal);

  // Close the modal when cancel button is clicked
  cancelLogoutButton.addEventListener("click", closeModal);

  // Handle the logout confirmation
  confirmLogoutButton.addEventListener("click", function () {
    // Add your logout logic here
    console.log("User confirmed logout");
    // Example: window.location.href = '/logout';
    closeModal();
  });

  // Close the modal if user clicks outside of it
  window.addEventListener("click", function (event) {
    if (event.target === logoutModal) {
      closeModal();
    }
  });
});
