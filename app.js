const commande = {
    type: '',                    // Type de pizza
    quantite: 0,                 // Quantité commandée
    prixUnitaire: 0,             // Prix unitaire de la pizza
    totalPizza: 0,                // Prix total des pizzas
    quantiteExtra: 0,            // Nombre d'extras
    prixExtras: 0,               // Prix total des extras
    totalAvantTaxe: 0,           // Total avant taxes
    taxe: 0,                     // Montant des taxes
    total: 0                     // Total final
};
const PORT = 80;
const { render } = require('ejs');
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app
.get('/', function (req, res, next) {
  res.render('pages/index');
})

.post('/', function (req, res, next) {
  console.log(req.body);
  commande.type = req.body.type;
  commande.quantite = parseInt(req.body.quantity);
  switch(commande.type) {
    case 'Hawaïenne':
      commande.prixUnitaire = 7;
      break;
    case 'AllDressed':
      commande.prixUnitaire = 8.1;
      break;
    case 'Sicilienne':
      commande.prixUnitaire = 6.3;
      break;
  }
  switch(req.body.size) {
    case 'small':
      commande.prixUnitaire *= 0.8;
      break;
    case 'medium':
      break;
    case 'large':
      commande.prixUnitaire *= 1.2;
      break;
  }
  commande.type = req.body.size + ' ' + commande.type;
  commande.totalPizza = commande.prixUnitaire * commande.quantite;
  if(req.body.extra_cheese == 'on')
    commande.quantiteExtra++;
  if(req.body.extra_pepperoni == 'on')
    commande.quantiteExtra++;
  if(req.body.sans_gluten == 'on')
    commande.quantiteExtra++;
  commande.prixExtras = commande.quantiteExtra * 0.5;
  commande.totalAvantTaxe = commande.prixExtras + commande.totalPizza;
  commande.taxe = commande.totalAvantTaxe * 0.15;
  commande.total = commande.totalAvantTaxe + commande.taxe;
  console.log(commande);
  res.render('pages/result', {commande: commande});
})

.use(function(req, res, next) {
  res.status(404).render('pages/404');
});

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}!`);
});