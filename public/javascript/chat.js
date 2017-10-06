$(function () {
  const socket = io();
  const messageInput = $('.messageForm .messageInput');
  const usernameInput = $('form.changeUsername .usernameInput')
  const chat = $('ul.messages')
  const navbarUsername = $('nav span.username');

  // Generate unique username whe user enters chat view
  let username = `Guest-${Math.floor(Math.random() * 100) + 1}`;

  // Set initial value for navbar welcoming text
  navbarUsername.text(`Welcome, ${username}`)

  // Emits new message to socket
  $('.messageForm').submit(() => {
    const message = {
      username: username,
      text: messageInput.val(),
    }

    socket.emit('message', message);
    messageInput.val('');
    return false;
  })

  // Receives message from socket and adds it to chat container
  socket.on('message', ((message) => {
    const senderName = message.username;
    const text = message.text;

    const messageHtml = `<li><b>${senderName}</b><p>${text}</p></li>`;
    chat.append(messageHtml)
  }));

  // Modifies local username
  $('form.changeUsername').submit(() => {
    username = usernameInput.val();
    usernameInput.val('');
    navbarUsername.text(`Welcome, ${username}`);
    return false;
  })
})
