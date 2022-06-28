function userLoggedMiddleware(req, res, next){
    res.locals.isLogged = false;
    
    if(req.session && req.session.user != undefined){
        res.locals.isLogged = true;
        res.locals.user = req.session.usuario;
        return next();
    }
    next();
}

module.exports = userLoggedMiddleware; 