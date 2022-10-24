const comments  = require('./comments.js')


matches = [
    {
        "id": 1,
        "homeTeam": "Dinamo",
        "guestTeam": "Lokomotiva",
        "played": true,
        "result": "3:2"
    },
    {
        "id": 2,
        "homeTeam": "Osijek",
        "guestTeam": "Gorica",
        "played": true,
        "result": "2:1"
    },
    {
        "id": 3,
        "homeTeam": "Šibenik",
        "guestTeam": "Rijeka",
        "played": true,
        "result": "0:1"
    },
    {
        "id": 4,
        "homeTeam": "Istra",
        "guestTeam": "Hajduk",
        "played": false,
        "result": null
    },
]


function connectMatchesWithComments() {

    let matchesWithComments = [];

    matches.forEach(match => {
        let commentsOfMatch = [];
        comments.comments.forEach(comment => {
            if (comment.matchId == match.id) {
                commentsOfMatch.push(comment);
            }
        })
        let matchHelper = match;
        matchHelper.comments = commentsOfMatch;
        matchesWithComments.push(matchHelper);
        
    });

    return matchesWithComments;

}

function getMatchById(id) {
    return matches.filter(el => el.id == id)[0];
}


function updateMatch(id, newResult) {
    matches.forEach(el => {
        if (el.id == id) {
            el.result = newResult;
            el.played = true;
        }
    })

}


module.exports = { matches, connectMatchesWithComments, getMatchById, updateMatch};