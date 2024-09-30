/* 
Auteur: Anouar Lahmidi
Date: 9/30/2024
Fichier: atlier10.js
Description: Fichier serveur pour le atelier 10
*/

var express = require('express');
var app = express();
app.set('view engine', 'ejs');

app.get('/', function (req, res, next) {
    res.render('pages/index');
});

app.get('/contact', function (req, res, next) {
    res.render('pages/contact');
});

app.get('/recherche/:annee/:mois', function (req, res, next) {
    res.render('pages/recherche', { annee: req.params.annee, mois: req.params.mois });
});

app.use(function (req, res) {
    res.status(404).render('pages/erreur');
});

function getCurrentDateTime() {
    var now = new Date();
    return {
        annee: now.getFullYear(),
        mois: now.getMonth() + 1,
        jour: now.getDate(),
        heure: now.getHours().toLocaleString('fr-CA', {minimumIntegerDigits: 2,useGrouping: false}),
        minute: now.getMinutes().toLocaleString('fr-CA', {minimumIntegerDigits: 2,useGrouping: false}),
        seconde:  now.getSeconds().toLocaleString('fr-CA', {minimumIntegerDigits: 2,useGrouping: false})
    };
}

var server = app.listen(8080)
var io = require('socket.io')(server);
var idConnect = 0;

var dateTimeStart = getCurrentDateTime();

console.log('Serveur lancé');

io.sockets.on('connection', function (socket) {
    var dateTime = getCurrentDateTime();
    console.log('Un client est connecté !');
    socket.emit('start',{dateTime: dateTimeStart});
    socket.emit('message', {idConnect: ++idConnect, dateTime: dateTime});
    socket.on('alarme', function(alarme){
        console.log('Un client me parle: ' + alarme);
        socket.emit('newAlarme',{alarme: alarme});
        socket.broadcast.emit('newAlarme', {alarme: alarme});
    });
});