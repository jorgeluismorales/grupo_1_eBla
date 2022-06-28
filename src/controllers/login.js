const { compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");

const Users = require('../models/users');

const loginView = (req, res) => {
        res.render('login-form');
}

const loginController = async (req, res) => {
    try{
      const { email, password } = req.body;
      const user = await Users.findOne({ where: { email } });
  
      if(!user){
        res.redirect('/login');
      }

      const hashPassword = user.get('password');
  
      const check = await compare(password, hashPassword)
  
      if(!check){
        res.redirect('/login')
      }else{

        user.set('password', undefined, {strict:false})
        const data = {
          name: user.get('firstname'),
          lastname: user.get('lastname'),

        }

/*         const data = {
          user
        }
        const cookiesOptions = {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          httpOnly: true
        }
        res.cookie('token', data, cookiesOptions) */
        req.session.user = data;
        res.redirect('/')

      }
  
    }catch(e){
     console.log(e)
    }
  }


module.exports = {
    loginView,
    loginController
}