$(function () {
  const socket = io();

  const messageInput = $('.messageForm .messageInput');
  const usernameInput = $('form.changeUsername .usernameInput')
  const chat = $('ul.messages')
  const navbarUsername = $('nav span.username');
  const usersList = $('ul.usersList');

  function scrollToBottom() {
    chat.animate({ scrollTop: chat[0].scrollHeight }, 1000);
  }

  function newMessage() {
    newMessagesCount += 1;
    document.title = `New messages (${newMessagesCount})`;
  }

  function updateUsersList(usernames) {
    usersList.empty();
    usernames.forEach((username) => {
      const listItem = `<li>${username}</li>`
      usersList.append(listItem);
    })
  }

  function formatMessage(msg) {
		var formattedMessage = msg;
		formattedMessage = formattedMessage.replace(/(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/g, "<a href=\"$1\" target=\"_blank\">$1</a>");

		return formattedMessage;
	}

  // Generate unique username whe user enters chat view
  let username = `guest-${Math.floor(Math.random() * 100) + 1}`;

  let newMessagesCount = 0;

  // Set initial value for navbar welcoming text
  navbarUsername.text(`Welcome, ${username}`);

  // Send user data to socket
  socket.emit('setData', {username: username});
  socket.emit('userConnect', username);

  // Emits new message to socket
  $('.messageForm').submit(() => {
    const message = {
      username: username,
      text: formatMessage(messageInput.val()),
    }

    socket.emit('message', message);
    messageInput.val('');

    scrollToBottom();
    return false;
  })

  // Reset message counter when user moves mouse
  $(window).mouseover(function(e) {
		document.title = "Chat";
		newMessagesCount = 0;
	});

  // Receives message from socket and adds it to chat container
  socket.on('message', ((message) => {
    const senderName = message.username;
    const text = message.text;

    const messageHtml = `<li class="message"><b>${senderName}</b><i>(${moment().format('H:mm:ss')})</i><p>${text}</p></li>`;
    chat.append(messageHtml)

    if (message.username !== username) {
      newMessage()
    }
  }));

  // Receives information about user connect
  socket.on('userConnect', ((username) => {
    const messageHtml = `<li class="warning"><p>${username} has connected.</p></li>`;
    chat.append(messageHtml);
    scrollToBottom()
  }));

  // Receives information about user disconnect
  socket.on('userDisconnect', ((username) => {
    const messageHtml = `<li class="warning"><p>${username} has disconnected.</p></li>`;
    chat.append(messageHtml)
    scrollToBottom()
  }));

  // Receives information nick changed by user
  socket.on('changeUsername', ((data) => {
    const messageHtml = `<li class="warning"><p>User ${data.old_username} changed nick name to: ${data.new_username}</p></li>`;
    chat.append(messageHtml)
    scrollToBottom()
  }));

  socket.on('updateUsersList', ((usernames) => updateUsersList(usernames)));

  // Modifies local username and changes data on socket
  $('form.changeUsername').submit(() => {
    const oldUsername = username;
    username = usernameInput.val();
    usernameInput.val('');
    navbarUsername.text(`Welcome, ${username}`);

    socket.emit('setData', { username: username } );
    socket.emit('changeUsername', {old_username: oldUsername, new_username: username});
    return false;
  })
})
