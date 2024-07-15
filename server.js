const express = require('express');
const app = express();
const port = 3000;

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];
app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    res.send('Hello there, ' + username + '!');
});

app.get('/', (req, res) => {
    res.send('Welcome to the greeting application, use /greetings/:username to get the greeting');
});
app.get('/roll/:number', (req, res) => {
    const number = parseInt(req.params.number, 10);
    if (isNaN(number)) {
        res.send('You must specify a number!');
    } 
    else {
        const randomNum = Math.floor(Math.random() * (number + 1));
        res.send('You rolled a ' + randomNum + '!');
    }
});

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index >= 0 && index < collectibles.length) {
        const { name, price } = collectibles[index];
        res.send(`So, do you want the ${name} for ${price}? It can be yours!`);
    } 
    else {
        res.send('This item is not yet in stock. Check back soon!');
    }
});
app.get('/shoes', (req, res) => {
    let filteredShoes = shoes;
    if (req.query['min-price']) {
        const minPrice = parseFloat(req.query['min-price']);
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    }
    if (req.query['max-price']) {
        const maxPrice = parseFloat(req.query['max-price']);
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    }
    if (req.query.type) {
        const type = req.query.type;
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    }
    res.json(filteredShoes);
});

app.listen(port, () => {
    console.log('The Server is running on http://localhost:' + port);
});
