require("dotenv").config();
const express = require('express');
const app = express();
const methodOverride =  require('method-override');
const cookieParser = require('cookie-parser')
const { dbConnectMySQL } = require('./config/db');
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser())


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/shopping-cart', (req, res) => {
    res.render('shopping-cart');
}
);
app.get('/login', (req, res) => {
    res.render('login-form');
}
);
app.get('/register', (req, res) => {
    res.render('register-form');
}
);

app.get('/', (req, res) => {
    res.redirect('/products');
})

app.use('/products', require('./routes/products'));

dbConnectMySQL();

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})