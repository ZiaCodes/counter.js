const { readFileSync, writeFileSync } = require('fs');
const express = require('express');
const { createHash } = require('crypto');
const path = require("path");

const app = express();

const salt = "H6rT-V?pKE5=*8mp";
var playlists = [
    { id: "PL55713C70BA91BD6E", total: 200 },
    { id: "PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI", total: 201 }
]

function getHash(data) {
    return createHash('sha256').update(data + salt).digest('hex');
}

function getRandomNumber(n) {
    return Math.floor(Math.random() * n);
}

function getRandomURL() {
    const playlist = playlists[getRandomNumber(playlists.length)];
    const songID = getRandomNumber(playlist.total);

    return `https://www.youtube.com/embed/?list=${playlist.id}&index=${songID}`;
}

app.get('/', (req, res) => {

    // secure the local DB
    var [count, hash] = readFileSync('./count.txt', 'utf-8').split(':');
    const tempHash = getHash(count);

    if (tempHash === hash) {
        const newCount = parseInt(count) + 1;
        const newHash = getHash(newCount);

        const data = newCount.toString() + ':' + newHash;

        writeFileSync('./count.txt', data);

    } else {
        count = "ERROR!";
    }

    // render music vid on every 1000 reqs
    var height = 0, width = 0;
    var url = getRandomURL() + `&mute=1`;

    if (count % 1000 === 0) {
        width  = 420;
        height = 315;
        url += `&autoplay=1`;
    }

    console.log('count ', count); // debug

    res.render('index', {
        counter: count,
        frame: {h: height, w: width, u: url}
    });
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(5000, () => {
    console.log(`Server is running at http://localhost:5000`)
})