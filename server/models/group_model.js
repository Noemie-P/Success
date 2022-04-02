const mongoose = require("mongoose");
const config = require("../config/connect");

mongoose.connect('mongodb://'+ config.MONGODB_CREDENTIALS +'/success',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à Groupe réussie !'))
  .catch(() => console.log('Connexion à Groupe échouée !'));

const Schema = mongoose.Schema;

const groupSchema = new Schema ({
    name:String
});

const Group = mongoose.model('groups', groupSchema)

module.exports = Group;