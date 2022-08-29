import {express as app} from 'express';
import fetch from 'node-fetch';

app.use(express.static('public'));
app.set('view-engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs')
});

let apiKey = '' //* Paste your API key here before starting the app

app.get('/lon=:longitude&lat=:latitude', (req, res) => {
    let longitude = req.params.longitude
    let latitude = req.params.latitude;
    let apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    fetch(apiLink)
        .then(result => result.json())
        .then(json => {
            res.render('result.ejs', {data: json, error: false})
        })
        .catch(err => {
            res.render('result.ejs', {error: true})
            console.log(err)
        })
});

app.listen(process.env.port || 3000)