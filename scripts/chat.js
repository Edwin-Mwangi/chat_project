//(ther are many ways to go about this but we'll use classes here)
//adding new chat docs
//setting real time listeners to listen to chats
//updating username
//updating the room

class Chatroom {
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }
    async addChat(message){
        const now = new Date();
        const chat = {
            message,// --> ES6 used to shorten
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }

        const response = await this.chats.add(chat);
        return response;
    };
    getChats(callback){
        this.unsub = this.chats
            //complex queries to specify & order the data(where and orderby)
        .where('room','==',this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot =>{
            snapshot.docChanges().forEach(change =>{
                if(change.type === 'added'){
                    //update the UI(to be done by another class)
                    callback(change.doc.data());
                }
            });
        });
    };
    updateName(username){
        this.username = username;
    
    }
    updateRoom(room){
        this.room = room;
        console.log('room updated');
        if(this.unsub){
            this.unsub();
        }
    }

};

const chatroom = new Chatroom('gaming','shaun');
// console.log(chatroom);
/* chatroom.addChat('Hello Everybody')
    .then(() => console.log('chat added'))
    .catch(err => console.log(err)); */

chatroom.getChats(data => console.log(data));

/* chatroom.updateRoom('gaming');
chatroom.getChats(data => console.log(data));
 */

//to simulate user changing sites after some time
setTimeout(() => {
    chatroom.updateRoom('gaming');
    chatroom.updateName('yosli');
    chatroom.getChats(data => console.log(data));
    chatroom.addChat('hello')
},3000);//3000 ms as 2nd arg