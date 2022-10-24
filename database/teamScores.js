const matches = require('./matches.js')


teams = [
    {
        "id": 1,
        "name": "Dinamo",
        "points": 0
    },
    {
        "id": 2,
        "name": "Lokomotiva",
        "points": 0
    },
    {
        "id": 3,
        "name": "Osijek",
        "points": 0
    },
    {
        "id": 4,
        "name": "Gorica",
        "points": 0
    }, {
        "id": 5,
        "name": "Šibenik",
        "points": 0
    },
    {
        "id": 6,
        "name": "Rijeka",
        "points": 0
    },
    {
        "id": 7,
        "name": "Istra",
        "points": 0
    },
    {
        "id": 8,
        "name": "Hajduk",
        "points": 0
    },
    {
        "id": 9,
        "name": "Varaždin",
        "points": 0
    },
    {
        "id": 10,
        "name": "Slaven",
        "points": 0
    },

]

function calculatePoints() {

    //svima postavi bodove na 0
    teams.forEach(team => team.points = 0);
    
    teams.forEach(team => {
        matches.matches.forEach(match => {
            if (match.played) {
                if (match.homeTeam == team.name) {
                   
                    //case they won
                    if (parseInt(match.result.split(":")[0]) > parseInt(match.result.split(":")[1])) {
                        team.points = team.points + 3;
                    } else if (parseInt(match.result.split(":")[0]) == parseInt(match.result.split(":")[1])) {
                        team.points = team.points + 1;
                    } else {
                        //nothing --> they lost
                    }
                } else if (match.guestTeam == team.name) {
                    //case they won
                    if (parseInt(match.result.split(":")[1]) > parseInt(match.result.split(":")[0])) {
                        team.points = team.points + 3;
                    } else if (parseInt(match.result.split(":")[1]) == parseInt(match.result.split(":")[0])) {
                        team.points = team.points + 1;
                    } else {
                        //nothing --> they lost
                    }
                }
            }
        });
    })
}

const sorter = (a, b) => a.points > b.points ? -1 : 1;

function getTeamsOrderdByScoreDesc() {
    return teams.sort(sorter);

}

module.exports = { calculatePoints, getTeamsOrderdByScoreDesc, teams };