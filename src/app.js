require("dotenv").config();
const cors = require('cors');
const express = require('express');
const app = express();
const methodOverride =  require('method-override');
const cookieParser = require('cookie-parser')
const { dbConnectMySQL } = require('./config/db');
const PORT = process.env.PORT || 3000;
URL_FRONTEND = process.env.URL_FRONTEND;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cors({origin: URL_FRONTEND}));
app.use(cookieParser())
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/shopping-cart', (req, res) => {
    res.render('shopping-cart');
}
);

app.get('/', (req, res) => {
    res.redirect('/products');
})

app.use('/register' , require('./routes/register'));
app.use('/products', require('./routes/products'));
app.use('/users', require('./routes/users'));
app.use('/login', require('./routes/login'));
app.use('/search', require('./routes/search'));


//API ROUTES
app.use('/api/categories', require('./routes/api/categoriesApiRoute'));
app.use('/api/products', require('./routes/api/productsApiRoute'));
app.use('/api/users', require('./routes/api/usersApiRoute'));
app.use('/api/login', require('./routes/api/authApiRoute'));

dbConnectMySQL();

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})