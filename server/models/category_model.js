const mongoose = require("mongoose");
const config = require("../config/connect");

mongoose.connect('mongodb://'+ config.MONGODB_CREDENTIALS +'/success',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à Model réussie !'))
  .catch(() => console.log('Connexion à Model échouée !'));

const Schema = mongoose.Schema;

const categorySchema = new Schema ({
    name:String
});

const Category = mongoose.model('categories', categorySchema)

module.exports = Category;