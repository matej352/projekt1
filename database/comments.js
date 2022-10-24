comments = [
    {
        "id": 1,
        "matchId": 1,
        "comment": "AJMOOOO",
        "authorEmail": "matej@gmail.com",
        "publishTime": new Date().toLocaleString()
    },
    {
        "id": 2,
        "matchId": 1,
        "comment": "Možete vi to!",
        "authorEmail": "slavko@gmail.com",
        "publishTime": new Date().toLocaleString()
    },
]


function addComment(authorEmail, matchId, comment) {

    let newIndex = getHighestIndex() + 1;
    comments.push({
        "id": newIndex,
        "matchId": matchId,
        "comment": comment,
        "authorEmail": authorEmail,
        "publishTime": new Date().toLocaleString()
    })

}

function getCommentById(id) {
    return comments.filter( el => el.id == id)[0];
}

function updateComment(id, text) {
    comments.forEach(element => {
        if (element.id == id) {
            element.comment = text;
        }
    });

}


function getHighestIndex() {
    let highest = 1;
    comments.forEach(element => {
        if (element.id > highest) {
            highest = element.id;
        }
    });
    return highest;
}


function deleteComment(id) {
    comments.removeByValueId(id);
}


Array.prototype.removeByValueId = function (id) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].id == id) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
}


module.exports = {addComment, comments, getCommentById, updateComment, deleteComment};