console.log("Page en marche");

var express = require('express');
var app = express();
app.set('view engine', 'ejs');

app.get('/',function(req,res,next){
    // res.send('<h1>Bienvenue dans mon super site!</h1>');
    res.send('<a href=contact>contact</a>')
});
app.get('/contact',function(req,res,next){
    // res.send('<p>Me contacter:<br>billgates@hotmail.com</p>');
    res.send("<table><tr><td>Nom:</td><td>Anouar Lahmidi</td></tr><tr><td>Code postale:</td><td>J6Z 2V4</td></tr><tr><td>Couriel:</td><td>lahmidianouar@gmail.com</td></tr><tr><td>Téléphone:</td><td>(438) 503-5864</td></tr></table><br><a href='/'>accueil</a>");
});
app.get('/module/:mod',function(req,res,next){
    if(req.params.mod>=1 && req.params.mod<=6)
        res.send('Module '+req.params.mod+"<br><a href='/'>accueil</a>");
    else
        res.send("MODULE INCONNU<br><a href='/'>accueil</a>");
    
});
app.use(function(req, res){
    res.writeHead(404);
    res.end("Erreur 404: Page introuvable");
});
app.listen(8080);