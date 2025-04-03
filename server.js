import express from 'express';
import fetch from 'node-fetch';
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/:lon&:lat', (req, res) => {
    let longitude = req.params.lon
    let latitude = req.params.lat;
    let apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.APIKEY}`;
    fetch(apiLink)
        .then(result => result.json())
        .then(json => {
            res.render('result', { data: json, error: false })
        })
        .catch(err => {
            res.render('result', { error: true })
            console.log(err)
        })
});

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log("Listening on port", port) });
