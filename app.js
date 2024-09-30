/* 
Auteur: Anouar Lahmidi
Date: 9/18/2024
Fichier: app.js
Description: Fichier serveur pour le lab 3
*/

console.log("Page en marche");

var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://127.0.0.1:1883');
var express = require('express');
var app = express();
let moduleStates = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
};

client.on('connect', function(){
    console.log("MQTT connecté!");
});

app.set('view engine', 'ejs');

app.get('/',function(req,res,next){
    res.render('./pages/accueil.ejs')
});
app.get('/contact',function(req,res,next){
    res.render('./pages/contact.ejs');
});
app.get('/module/:mod',function(req,res,next){
    const mod = req.params.mod;
    if (moduleStates.hasOwnProperty(mod))
    {
        moduleStates[mod] = moduleStates[mod] ? 0 : 1;
        res.render('./pages/module.ejs', { modu: mod, modul: moduleStates[mod] });
    }
    else
    {
        res.render('./pages/module.ejs', { modu: "INTROUVABLE", modul: 0 });
    }
});
app.get('/controle',function(req,res,next){
    res.render('./pages/control.ejs', {modul: moduleStates});
});
app.get('/reset',function(req,res,next){
    for(var i =1;i<=6;i++)
        moduleStates[i]=0;

    res.render('./pages/control.ejs', {modul: moduleStates});
});
app.use(function(req, res){
    res.writeHead(404);
    res.end("Erreur 404: Page introuvable");
});
app.listen(8080);

