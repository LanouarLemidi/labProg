var express = require('express');
var app = express();
app.set('view engine', 'ejs');

app.get('/',function(req,res,next){
    res.render('pages/index');
});

app.get('/contact',function(req,res,next){
    res.render('pages/contact');
});

app.get('/recherche/:annee/:mois',function(req,res,next){
    res.render('pages/recherche',{annee: req.params.annee, mois: req.params.mois});
});

app.use(function(req,res){
    res.render('pages/erreur')
});

app.listen(8080);
console.log('Serveur lancé');