const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

module.exports = {
    loginPage: (req, res) => {
        res.render('login.ejs', {
            title: 'Carbon Copy - Login Page',
            message: ''
          });
    },
    login: (req, res) => {
        let message = '';
        let sess = req.session;

        if (req.method == "POST") {
            var post = req.body;
            var name = post.usr_name;
            var pass = post.password;

            let sql = 'SELECT id, first_name, last_name, usr_name FROM usr_accounts WHERE usr_name = "' + name + '" AND password = "' + pass + '"';
            db.query(sql, function(err, results){
                if (results.length) {
                    req.session.userID = results[0].id;
                    req.session.user = results[0];
                    console.log(results[0].id);
                    res.redirect('/');
                } else {
                    message = 'Wrong Credentials';
                    res.render('/', { message: message});
                }
            });
        } else {
            res.render('index.ejs', {message: message});
        }
    },
    signup: (req, res) => {
        message = '';
        if (req.method == "POST"){
            var post = req.body;
            var name = post.usr_name;
            var pass = post.password;
            var fname = post.first_name;
            var lname = post.last_name;
            var phone = post.phone_num;
            var email = post.email;

            var sql = 'INSERT INTO usr_accounts (first_name, last_name, usr_name, password, email, phone_num) VALUES ("' + fname + '", "' + lname + '", "' + name + '", "' + pass + '", "' + email + '", "' +  phone + '")';
            
            db.query(sql, function (err, results) {
                message = 'Your account has been created!';
                res.render('signup', {
                    title: 'Carbon Copy - Sign Up',
                    message: message
                })
            })
        } else {
            res.render('signup', {
                title: 'Carbon Copy - Sign Up',
                message: message
            });
        }
    }
}