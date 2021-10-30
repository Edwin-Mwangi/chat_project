const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg'); //in a div below
const rooms = document.querySelector('.chatrooms');


//submit message
newChatForm.addEventListener('submit', e =>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
});

//update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    //update name via chatroom
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    //reset the form
    newNameForm.reset();
    //show then hide update msg
    updateMssg.innerText = `Your name has been updated to ${newName}` 
    setTimeout(() => updateMssg.innerText = '', 3000); //empty str after 3 s

});

//changing rooms
rooms.addEventListener('click', e =>{
    if(e.target.tagName === "BUTTON"){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));

    }
});


const username = localStorage.username? localStorage.username : "anon";
//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('gaming',username);
//get chats and render to DOM
chatroom.getChats(data => chatUI.render(data)); 
//no problem if chatroom is after the event listener and used in it coz code aleady read and submit event is initiated by user