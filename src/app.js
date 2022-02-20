const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('home');
}
);
app.get('/product-detail', (req, res) => {
    res.render('product-detail');
}
);
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

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})