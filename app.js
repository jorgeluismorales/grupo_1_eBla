const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login-form.html');
})

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register-form.html');
})

app.get('/shoppingcart', (req, res) => {
    res.sendFile(__dirname + '/views/shopping-cart.html');
})

app.get('/productdetail', (req, res) => {
    res.sendFile(__dirname + '/views/product-detail.html');
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})