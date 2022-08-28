import fs from 'fs';
const  {apiKey} = JSON.parse(fs.readFileSync('./env.json'));
import express from 'express';
import fetch from 'node-fetch';

const app = express();

app.use(express.static('public'));
app.set('view-engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs', {data: null, error: false})
});

app.get('/lon=:longitude&lat=:latitude', (req, res) => {
    let longitude = req.params.longitude
    let latitude = req.params.latitude;
    let apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey.testing}`;
    fetch(apiLink)
        .then(result => {
            console.log(result.text());
            res.render('result.ejs', {data: result.text(), error: false})
        })
        .catch(err => {
            console.log(err)
            // res.render('index.ejs', {data: result, error: true});
        })
});

app.listen(3000)