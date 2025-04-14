document.addEventListener("DOMContentLoaded", () => {
  const conversations = document.querySelectorAll(".conversation");

  conversations.forEach((convo) => {
    convo.addEventListener("click", () => {
      const roomId = convo.dataset.roomId;
      console.log("clicked: ", roomId);
      const name = convo.dataset.roomName;
      const avatar = convo.dataset.userAvatar;

      //update the chat header
      const chatHeader = document.getElementById("chat-header");
      const userAvatar = document.getElementById("user-avatar");
      const roomName = chatHeader.querySelector("#room-name");
      const userStatus = chatHeader.querySelector("#user-status");
      const statusIndicator = document.getElementById("status-indicator");

      userAvatar.src = avatar
        ? avatar
        : `https://ui-avatars.com/api/?name=${roomName.split(" ")[0]}+${
            roomName.split(" ")[1]
          }&size=40`;

      roomName.textContent = name;
      userStatus.textContent = "Online";
      statusIndicator.classList.replace("bg-gray-500", "bg-green-500");

      //fetch messages
      fetch(`/chat/load-messages/${roomId}/`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const messageContainer = document.querySelector(
            "#messages-container .space-y-4"
          );
          messageContainer.innerHTML = "";
          const currentUserAvatar = data.current_user_avatar;
          console.log("AVATAR: ", currentUserAvatar);
          if (data.messages && data.messages.length > 0) {
            data.messages.forEach((msg) => {
              const messageClass = msg.is_current_user
                ? "sent-message"
                : "received-message";
              const placeholderUser =
                "https://ui-avatars.com/api/?name=You&size=40";
              const placeholderOther =
                "https://ui-avatars.com/api/?name=" + msg.sender + "&size=40";
              const avatar = msg.is_current_user
                ? currentUserAvatar
                : msg.sender_avatar;

              const messageHTML = `
              <!--Messages-->
              <div class="flex items-end ${
                msg.is_current_user ? "justify-end" : ""
              }">
                ${
                  msg.is_current_user
                    ? ""
                    : `<img src="${avatar}" class="w-8 h-8 rounded-full mr-2" alt="Contact">`
                }
                <div class="${
                  msg.is_current_user
                    ? "bg-primary rounded-lg rounded-br-none"
                    : "bg-white rounded-lg rounded-bl-none"
                } px-4 py-2 max-w-xs md:max-w-md shadow">
                  <p class="font-robot text-sm ${
                    msg.is_current_user ? "text-white" : "text-gray-800"
                  }">
                    ${msg.text}
                  </p>
                  <p class="text-xs ${
                    msg.is_current_user
                      ? "text-white opacity-70"
                      : "text-gray-500 mt-1"
                  }">${msg.timestamp}</p>
                </div>
                ${
                  msg.is_current_user
                    ? `<img src="${avatar}" class="w-8 h-8 rounded-full ml-2" alt="Contact">`
                    : ""
                }
              </div>
              `;
              messageContainer.innerHTML += messageHTML;
            });
          } else {
            messageContainer.innerHTML = "<p>No Messages Found</p>";
          }
        })
        .catch((error) => console.error("Error fetching messages: ", error));
    });
  });
});
