//render chat templates to the DOM
//clear list of chats (when room changes)

class ChatUI{
    constructor(list){
        this.list = list;
    }
    clear(){
        this.list.innerText = "";
    };
    render(data){
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            {addSuffix: true}
        );
        const html =`
        <li class = 'list-group-item'>
        <span class = 'username'>${data.username}</span>
        <span class = 'message'>${data.message}</span>
        <div class = 'time'>${when}</div>
        `
        this.list.innerHTML += html;
    };
};