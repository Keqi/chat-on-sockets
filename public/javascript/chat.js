$(function () {
  const socket = io();

  const messageInput = $('.messageForm .messageInput');

  $('.messageForm').submit(() => {
    const message = messageInput.val();
    socket.emit('chat message', message);
    messageInput.val('');
    return false;
  })

  socket.on('chat message', ((msg) => {
    $('ul.messages').append($('<li>').text(msg));
  }));
})
