const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');

app.use(express.static(path.join(__dirname, '/public')));//Serve static assets, such as CSS.  Takes absolute path to index.js file and adding on public.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('frontPage');
});

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('pageNotFound', { subreddit });
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000.");
});