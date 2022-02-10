const { readFileSync, writeFileSync } = require('fs');
const express = require('express');
const app = express();
const { createHash } = require('crypto');

const salt = "H6rT-V?pKE5=*8mp";

function get_hash(data) {
    return createHash('sha256').update(data + salt).digest('hex');
}

app.get('/', (req, res) => {
    var [count, hash] = readFileSync('./count.txt', 'utf-8').split(':');
    const tempHash = get_hash(count);

    if (tempHash === hash) {
        const newCount = parseInt(count) + 1;
        const newHash = get_hash(newCount);

        const data = newCount.toString() + ':' + newHash;

        writeFileSync('./count.txt', data);

    } else {
        count = "ERROR!";
    }

    console.log('count ', count);

    res.send(
        `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visitor Counter</title>
</head>
<body>
<h1>Welcome User</h1>
<p>This page has been viewed ${count} times.</p>
</body>
</html>`
    )
});

app.listen(5000, () => {
    console.log(`Server is running at http://localhost:5000`)
})