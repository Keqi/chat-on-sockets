$(function () {
  const socket = io();
  const messageInput = $('.messageForm .messageInput');
  const chat = $('ul.messages')

  const guestId = Math.floor(Math.random() * 100) + 1;

  $('.messageForm').submit(() => {
    const message = {
      username: `Guest-${guestId}`,
      text: messageInput.val(),
    }

    socket.emit('message', message);
    messageInput.val('');
    return false;
  })

  socket.on('message', ((message) => {
    const senderName = message.username;
    const text = message.text;

    const messageHtml = `<li><b>${senderName}</b><p>${text}</p></li>`;
    chat.append(messageHtml)
  }));
})
