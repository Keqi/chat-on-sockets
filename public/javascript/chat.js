const socket = io();

$(function () {
  const messageInput = $('.messageForm .message');

  $('.messageForm').submit(() => {
    const message = messageInput.val();
    socket.emit('chat message', message);
    messageInput.val('');
    return false;
  })
})
