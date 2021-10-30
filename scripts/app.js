const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');

newChatForm.addEventListener('submit', e =>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
});

//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('gaming','shaun');
//get chats and render to DOM
chatroom.getChats(data => chatUI.render(data)); 
//no problem if chatroom is after the event listener and used in it coz code aleady read and submit event is initiated by user