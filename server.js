const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/detail', (req, res) => {
    res.sendFile(__dirname + '/detail.html');
});

app.get('/myTrip', (req, res) => {
    res.sendFile(__dirname + '/myTrip.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

app.get('/terms', (req, res) => {
    res.sendFile(__dirname + '/terms.html');
});

app.get('/birthTerms', (req, res) => {
    res.sendFile(__dirname + '/birthTerms.html');
});

app.get('/personalInfoTerms', (req, res) => {
    res.sendFile(__dirname + '/personalInfoTerms.html');
});

app.listen(port, () => console.log(`listening on port ${port}!`));
