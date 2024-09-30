var express = require('express');
var app = express();

app.get('/',function(req,res,next){
    res.send('<h1>Bienvenue dans mon super site!</h1>')
});

app.get('/contact',function(req,res,next){
    res.send("<p>Me contacter:<br>billgates@hotmail.com</p><a href='/'>retour</a>")
});

app.get('/recherche/:annee/:mois',function(req,res,next){
    res.send('Vous êtes dans la section recherche. Voici les résultats pour la date de '+req.params.mois+' '+req.params.annee+"<br><a href='/'>retour</a>");
});

app.use(function(req,res){
    res.writeHead(404);
    res.end('ERREUR 404');
});

app.listen(8080);
console.log('Serveur lancé');