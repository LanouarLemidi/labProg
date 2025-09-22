const PORT = 80;
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
    res.send(`Vous avez choisi une pizza de type ${req.body.type}`);
})

.use(function(req, res, next) {
    res.status(404).render('pages/404');
});

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}!`);
});