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
let data = "";
let resultats = [];
const PORT = 80;
const fs = require('fs');
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
  data = `${req.body.telephone.replace(/\D/g, '')}:${req.body.email}:${req.body.prenom}:${req.body.nom}:${req.body.code_postal}:${req.body.adresse}:${commande.quantite}:${commande.type}:${commande.quantiteExtra}:${(commande.total.toFixed(2))}:${req.body.mode_paiement}\n`;
  fs.appendFileSync('historique.txt', data);
  console.log(data);
  res.render('pages/result', {commande: commande});
})

.get('/historique', function (req, res, next) {
  resultats = [];
  res.render('pages/historique', { resultats: resultats });
})

.post('/historique', function (req, res, next) {
  const tele = req.body.telephone.replace(/\D/g, '');
  console.log(tele);
  resultats = chercher(tele);
  res.render('pages/historique', { resultats: resultats });
})

.use(function(req, res, next) {
  res.status(404).render('pages/404');
});

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}!`);
});

function chercher(tele){
  const historique = fs.readFileSync('historique.txt', 'utf-8');
  const lignes = historique.split("\n");
  const resultats = [];

  for(let ligne of lignes) {
    const champs = ligne.split(":");
    if(champs[0] == tele) {
      resultats.push({
        telephone: champs[0],
        courriel: champs[1],
        prenom: champs[2],
        nom: champs[3],
        code_postal: champs[4],
        adresse: champs[5],
        quantite: champs[6],
        type: champs[7],
        quantiteExtra: champs[8],
        total: champs[9],
        mode_paiement: champs[10]
      });
    }
  }
  return resultats;
}