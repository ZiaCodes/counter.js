const { readFileSync, writeFileSync } = require('fs');
const { createHash } = require('crypto');
const express = require('express');
const axios = require('axios');
const path = require("path");
const config = require("./config");


const app = express();

function getHash(data) {
    return createHash('sha256').update(data + config.SALT).digest('hex');
}

function randInt(n) {
    return Math.floor(Math.random() * n);
}

function getVideoURL() {
    const playlist = config.playlists[randInt(config.playlists.length)];
    const songID = randInt(playlist.total);

    return `https://www.youtube.com/embed/?list=${playlist.id}&index=${songID}`;
}

app.get('/', async (req, res) => {

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

    // render random music video on every 1000 reqs
    var vid_height = 0, vid_width = 0;
    var vid_url = '';

    if (count % 1000 === 0) {
        vid_width = 420;
        vid_height = 315;
        vid_url = getVideoURL() + `&mute=1&autoplay=1`;
    }

    // render random GIF on every 10 reqs
    var gif_height = 0, gif_width = 0;
    var gif_url = '';

    if (count % 10 === 0) {
        gif_width = 420;
        gif_height = 315;

        const response = await axios.get(config.GIF_API_ENDPOINT)

        if (response.status === 200) {
            let results = response.data['results'];
            gif_url =  results[randInt(results.length)]['media'][0]['gif'].url;
        }
        else{
            gif_url = "https://c.tenor.com/jwAkhSG3BWEAAAAC/error.gif"; // ERROR gif
        }
    }

    console.log('count ', count); // debug

    res.render('index', {
        counter: count,
        vid: { h: vid_height, w: vid_width, u: vid_url },
        gif: { h: gif_height, w: gif_width, u: gif_url }
    });
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(config.PORT, () => {
    console.log(`Server is running at http://${config.HOST}:${config.PORT}`)
})