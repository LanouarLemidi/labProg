var express = require('express');
var router = express.Router();
var {io} = require("../socketApi");
var {Item, ItemList} = require("../public/javascripts/item");

const itemList = new ItemList();
itemList.add(new Item('banane', '0,99$', itemList));
itemList.add(new Item('pomme', '1,20$', itemList));
itemList.add(new Item('orange', '0,80$', itemList));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lab 5', list: itemList});
});



io.on('connection', function(socket) {
  socket.on("add", function(data) {
    itemTmp = new Item(data.nom, data.prix, itemList)
    console.log(itemTmp);
    itemList.add(itemTmp);
    socket.emit('newItem', {id : itemTmp.id, date : itemTmp.date, nom : itemTmp.nom, prix : itemTmp.prix});
  });
  socket.on('deleteID', function(data) {
    itemList.removeItemById(data.id);
  });
  socket.on('deleteNom', function(data) {
    itemList.removeItemByName(data.nom);
  });
  socket.on("display", function(message) {
    console.log(message);
  });
});

module.exports = router;