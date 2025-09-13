/* AL 2025-09-12
fichier serveur du lab 3 */
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
const modules = [false, false, false, false, false, false];

app.get('/', function (req, res, next) {
  res.render('index');
});

app.get('/contact', function (req, res, next) {
  res.render('contact');
});

app.get('/module/:nb', function (req, res, next) {
  const nb = parseInt(req.params.nb, 10);
  let moduleNumber;
  let status;
  if (nb >= 1 && nb <= 6) {
    modules[nb - 1] = !modules[nb - 1];
    status = modules[nb - 1] ? 'on' : 'off';
    moduleNumber = nb.toString();
  }
  else
    moduleNumber = 'inconnu';
  res.render('module', { moduleNumber: moduleNumber, status: status });
});

app.get('/controle', function (req, res, next) {
  res.render('controle', { modules: modules });
});

app.get('/reset', function (req, res, next) {
  for(i in modules) {
    modules[i] = false;
  }
  res.redirect('/controle');
});

app.use(function(req, res, next) {
    res.status(404).send('404: Page introuvable<br><a href="/">Accueil</a>');
});

app.listen(8080, function () {
  console.log('listening on port 8080!');
});