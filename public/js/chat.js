import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';

// CLIENT_SEND_MESSAGE
const form = document.querySelector(".chat .inner-form");
if(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(e.target.elements.content.value);
    const content = e.target.elements.content.value;
    socket.emit("CLIENT_SEND_MESSAGE", content);
    e.target.elements.content.value = "";
  })
}
// End CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  const body = document.querySelector(".chat .inner-body");

  let htmlFullName = "";

  const div = document.createElement("div");
  if(data.userId === myId) {
    div.classList.add("inner-outgoing");
  } else {
    htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
    div.classList.add("inner-incoming");
  }
  
  div.innerHTML = `
    ${htmlFullName}
    <div class="inner-content">${data.content}</div>
  `
  body.appendChild(div);
  body.scrollTop = bodyChat.scrollHeight;
});
// End SERVER_RETURN_MESSAGE

// Scroll Chat to Bottom
const bodyChat = document.querySelector(".chat .inner-body");
if(bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight;
}
// End Scroll Chat to Bottom

// Show Icon Chat
  // Show Popup
const button = document.querySelector('.chat .inner-foot .buttonIcon');
if(button) {
  const tooltip = document.querySelector('.tooltip');
  Popper.createPopper(button, tooltip);
  button.onclick = () => {
    tooltip.classList.toggle('shown');
  }
}
  // End Show Popup

  // Show Typing
  var timeOut = "";
  const showTyping = () => {
    socket.emit("CLIENT_SEND_TYPING", "show");
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      socket.emit("CLIENT_SEND_TYPING", "hidden");
    }, 3000);
  };
  // End Show Typing

  // Insert Icon to Input
  const emojiPicker = document.querySelector("emoji-picker");
  if(emojiPicker) {
    const input = document.querySelector(".chat .inner-foot input[name='content']");
    if(input) {
      document.querySelector('emoji-picker')
      .addEventListener('emoji-click', event => {
        const icon = event.detail.unicode;
        input.value = input.value + icon;
        showTyping();
        const end = input.value.length;
        input.setSelectionRange(end, end);
        input.focus();
      });
    }

    // Input Key
    input.addEventListener('keyup', () => {
      showTyping();
    })
    // End Input Key

  }
  // End Insert Icon to Input

// End Show Icon Chat

// CLIENT_RETURN_TYPING
socket.on("CLIENT_RETURN_TYPING", (data) => {
  const listTyping = document.querySelector(".chat .inner-body .inner-list-typing");
  if(listTyping) {
    if(data.type == "show") {
      listTyping.innerHTML = `
        <div class="box-typing" userId=${data.userId}>
          <div class="inner-name"> ${data.fullName} </div>
          <div class="inner-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      `
      const bodyChat = document.querySelector(".chat .inner-body");
      if(bodyChat) {
        bodyChat.scrollTop = bodyChat.scrollHeight;
      }
    } else {
      const boxTyping = document.querySelector(`.chat .inner-body .inner-list-typing .box-typing[userId='${data.userId}'`);
      if(boxTyping ) {
        listTyping.removeChild(boxTyping);
      }
    }
  }
});
// End CLIENT_RETURN_TYPING