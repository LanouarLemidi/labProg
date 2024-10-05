/* 
Auteur: Anouar Lahmidi
Date: 10/04/2024
Fichier: user.js
Description: Fichier serveur pour l'atelier 5
*/
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
