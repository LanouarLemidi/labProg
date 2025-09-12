var express = require('express');
var app = express();

app.get('/', function (req, res, next) {
  res.send('<a href="/contact">Contact</a>');
});

app.get('/contact', function (req, res, next) {
  res.send('<table><tr><th>Nom</th><th>Prénom</th><th>Code Postale</th><th>courriel</th><th>Téléphone</th></tr><tr><td>Doe</td><td>John</td><td>12345</td><td>john.doe@example.com</td><td>555-1234</td></tr></table><a href="/">Accueil</a>');
});

app.get('/module/:nb', function (req, res, next) {
  var moduleNumber = req.params.nb;
  var text;
  if(moduleNumber >=1 && moduleNumber <=6)
    text = 'Module numéro: ' + moduleNumber;
  else
    text = 'Module inconnu';
  res.send(text +'<br> <a href="/">Accueil</a>');
});

app.use(function(req, res, next) {
    res.status(404).send('404: Page introuvable<br><a href="/">Accueil</a>');
});

app.listen(8080, function () {
  console.log('listening on port 8080!');
});