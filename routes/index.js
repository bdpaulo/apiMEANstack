var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET all heroes. */
router.get('/heroes', function (req, res, next) { //trata as resquisicoes get no endpoint /heroes
  var db = require('../db');
  var Heroes = db.Mongoose.model('herocollection', db.heroSchema, 'herocollection'); //instancia um objeto relacionado ao BD e o schema
  Heroes.find({}).lean().exec(function(e,docs){ //executa a busca no BD, como nao tem nada dentro de 'find' eh retornado um JSON com todos os dados
    res.json(docs);
    res.end();
  }); 
});

/* GET ONE hero. */
router.get('/heroes/:id', function (req, res, next) { //trata a requisicao get sendo que a busca deve ser feita usando o id
  var db = require('../db');
  var Hero = db.Mongoose.model('herocollection', db.heroSchema, 'herocollection');
  Hero.find({ _id: req.params.id }).lean().exec(function (e, docs) {  //usa o id para a pesquisa no banco
      res.json(docs);
      res.end();
  });
});

/* POST ONE hero. */
router.post('/heroes', function (req, res, next) {
  var db = require('../db');
  var Hero = db.Mongoose.model('herocollection', db.heroSchema, 'herocollection'); //instancia o BD e o esquema a ser usado
  var newhero = new Hero({  //instancia o novo hero e preenche os campos com os dados vindos do body da requisicao
      heroName: req.body.heroName
  });
  
  newhero.save(function (err) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json(newhero);
      res.end();
  });
});


/* PUT ONE hero. */
router.put('/heroes/:id', function (req, res, next) {
  var db = require('../db');
  var Hero = db.Mongoose.model('herocollection', db.heroSchema, 'herocollection');
  Hero.findOneAndUpdate({ _id: req.params.id }, 
    req.body, //aqui estao os dados novos para a atualizacao no BD
    { upsert: true }, //significa que se o objeto com o id especificado não existir no bd, ele sera criado
    function (err, doc) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json(req.body);
      res.end();
  });
});

/* DELETE ONE hero. */
router.delete('/heroes/:id', function (req, res, next) {
    var db = require('../db');
    var Hero = db.Mongoose.model('herocollection', db.heroSchema, 'herocollection');
    Hero.find({ _id: req.params.id }).remove(function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.json({success: true});
        res.end();
    });
});

module.exports = router;
