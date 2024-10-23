var express = require('express');
var router = express.Router();

var session = require('cookie-session');

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'adminbitch',
  database: 'lab7'

});

let data = {
  log: '',
  droit: 0,
  texte: ''
}

connection.connect(function (err) {

  if (err) throw err;

  console.log('Vous êtes connecté à votre BDD...');

});

router.use(session({ secret: 'toDoTopSecret' }))

  .use(function (req, res, next) {
    if (typeof (req.session.user) == 'undefined') {
      req.session.user = {
        id : 0,
        login: '',
        password: ''
      }
    }
    next();
  })

  /* GET home page. */
  .get('/', function (req, res, next) {
    if (req.session.user.id) {
      var querystring = 'SELECT * FROM Utilisateurs';
      connection.query(querystring, function (err, rows) {
        if (!err)
            res.render('./pages/user', { title: rows[req.session.user.id-1].login, rows: rows, id: req.session.user.id-1 });
        else {
          console.log('Error');
          res.redirect('/');
        }
      });
    }
    else
      res.render('./pages/index', { title: 'Lab 7' });
  })

  .post('/', function (req, res) {
    var log = req.body.log;
    var pass = req.body.pass;
    var querystring = 'SELECT * FROM Utilisateurs';
    connection.query(querystring, function (err, rows) {
      if (!err) {
        console.log(rows);
        var id = 0;
        rows.forEach(element => {
          if (element.login == log && element.password == pass) {
            id = element.id;
            req.session.user.id=id;
            req.session.user.login = log;
            req.session.user.password = pass;
            console.log(req.session);
          }
        });
        if (id) {
          id -= 1;
          res.render('./pages/user', { title: rows[id].login, rows: rows, id: id });
        }
        else
          res.render('./pages/index', { title: 'Lab 7 - WRONG LOGIN OR PASSWORD' });
      }
      else {
        console.log('Error');
        res.redirect('/');
      }
    });
  })
  .post('/change', function (req, res) {
    console.log(req.body.droit);
    switch (req.body.droit) {
      case '1':
        var querystring = 'UPDATE Utilisateurs SET texte = "' + req.body.texte + '" WHERE id = "' + req.body.id + '"';
        break;
      case '2':
        var querystring = 'UPDATE Utilisateurs SET texte = "' + req.body.texte + '", password= "' + req.body.password + '" WHERE id = "' + req.body.id + '"';
        if(req.session.user.id==req.body.id)
          req.session.user.password = req.body.password;
        break;
      case '3':
        var querystring = 'UPDATE Utilisateurs SET texte = "' + req.body.texte + '", password= "' + req.body.password + '" WHERE id = "' + req.body.id + '"';
        if(req.session.user.id==req.body.id)
          req.session.user.password = req.body.password;
        break;
      default:
        break;
    }
    connection.query(querystring, function (err, rows) {
      res.redirect('/');
    });
  });
module.exports = router;
