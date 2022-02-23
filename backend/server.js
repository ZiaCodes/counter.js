const { readFileSync, writeFileSync } = require('fs');
const crypto = require('crypto');
const express = require('express');
const axios = require('axios');
const config = require("./config");


const app = express();


function encrypt(data) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes128', config.SECRET_KEY, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + encrypted;
}

function decrypt(data) {
    const iv = Buffer.from(data.slice(0, 32), 'hex');
    data = data.slice(32,);

    const decipher = crypto.createDecipheriv('aes128', config.SECRET_KEY, iv);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

function randInt(n) {
    return Math.floor(Math.random() * n);
}

function getVideoURL() {
    const playlist = config.playlists[randInt(config.playlists.length)];
    const songID = randInt(playlist.total);

    return `https://www.youtube.com/embed/?list=${playlist.id}&index=${songID}`;
}

app.get('/api', async (req, res) => {

    // secure the local DB
    var data = readFileSync('./count.txt', 'utf-8');
    var count;

    try {
        count = parseInt(decrypt(data));
        const newCount = count + 1;
        const encryptedData = encrypt(newCount.toString());

        writeFileSync('./count.txt', encryptedData);
    }
    catch {
        count = "ERROR!";
    }

    // render random music video on every 1000 reqs
    var vid_url = '';

    if (count % 1000 === 0) {
        vid_url = getVideoURL() + `&mute=1&autoplay=1`;
    }

    // render random GIF on every 10 reqs
    var gif_url = '';

    if (count % 10 === 0) {
        const response = await axios.get(config.GIF_API_ENDPOINT)

        if (response.status === 200) {
            let results = response.data['results'];
            gif_url = results[randInt(results.length)]['media'][0]['gif'].url;
        }
        else {
            gif_url = "https://c.tenor.com/jwAkhSG3BWEAAAAC/error.gif"; // ERROR gif
        }
    }

    console.log('count ', count); // debug

    res.json({
        counter: count,
        v_url: vid_url,
        i_url: gif_url
    });
});

app.listen(config.PORT, () => {
    console.log(`Server is running at http://${config.HOST}:${config.PORT}/api`)
});