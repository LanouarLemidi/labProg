/* 
Auteur: Anouar Lahmidi
Date: 10/04/2024
Fichier: index.js
Description: Fichier serveur pour l'atelier 5
*/
var express = require('express');
var router = express.Router();
var { io } = require("../socketApi");
var { Item, ItemList } = require("../public/javascripts/item");
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://127.0.0.1:1883');

const itemList = new ItemList();
itemList.add(new Item('banane', '0,99$', itemList));
itemList.add(new Item('pomme', '1,20$', itemList));
itemList.add(new Item('orange', '0,80$', itemList));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Lab 5', list: itemList });
});

client.subscribe('ITEM/#');

client.on('connect', function () {
  console.log('MQTT connecté');
});

io.on('connection', function (socket) {
  socket.on("add", function (data) {
    itemTmp = new Item(data.nom, data.prix, itemList)
    console.log(itemTmp);
    itemList.add(itemTmp);
    socket.emit('newItem', { id: itemTmp.id, date: itemTmp.date, nom: itemTmp.nom, prix: itemTmp.prix });
    client.publish('ITEM/WEB/NEW', itemTmp.id + '\n' + itemTmp.date + '\n' + itemTmp.nom + '\n' + itemTmp.prix);
  });
  socket.on('deleteID', function (data) {
    itemList.removeItemById(data.id);
    client.publish('ITEM/WEB/DELETE/ID', String(data.id));
  });
  socket.on('deleteNom', function (data) {
    itemList.removeItemByName(data.nom);
    client.publish('ITEM/WEB/DELETE/NAME', String(data.nom));
  });
  socket.on("display", function (message) {
    console.log(message);
  });
  client.on('message', function (topic, message) {
    switch (topic) {
      case 'ITEM/MODULE/NEW':
        itemTmp = new Item(message.toString().split('\n')[0], message.toString().split('\n')[1], itemList);
        console.log(itemTmp);
        itemList.add(itemTmp);
        socket.emit('newItem', { id: itemTmp.id, date: itemTmp.date, nom: itemTmp.nom, prix: itemTmp.prix });
        break;
      case 'ITEM/MODULE/DELETE/ID':
        itemList.removeItemById(message.toString());
        socket.emit('deleteID', message.toString());
        break;
      case 'ITEM/MODULE/DELETE/NAME':
        itemList.removeItemByName(message.toString());
        socket.emit('deleteNom', message.toString());
        break;
    }
  });
});

module.exports = router;