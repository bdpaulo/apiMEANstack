var mongoose = require('mongoose'); //define objeto mongoose que serve para traduzir os dados do mongo para objetos a serem utilizados na app 

const url = 'mongodb://localhost:27017/api'; // local onde está o banco para o mongoose se conectar

mongoose.connect(url, function(err, db){ //conexão com o bd
    if(err){
        console.log('Unable to connect to the mongoDB server - error:', err);
    }
});

var heroSchema = new mongoose.Schema({ //define o esquema da colecao de herois
    heroName: String,
    id: String
    }, { collection: 'herocollection' }
);
 
module.exports = { Mongoose: mongoose, heroSchema: heroSchema }