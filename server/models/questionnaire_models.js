const mongoose = require("mongoose");
const config = require("../config/connect");

mongoose.connect('mongodb://'+ config.MONGODB_CREDENTIALS +'/success',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à Questionnaire réussie !'))
  .catch(() => console.log('Connexion à Questionnaire échouée !'));

const Schema = mongoose.Schema;

const questionnaireSchema = new Schema ({
    questionnaire_name: String,
    code: Number,
    categorie:{
      type: Schema.Types.ObjectId,
      ref:"categories"
    },
    groupe:{
      type: Schema.Types.ObjectId,
      ref:"groups"
    },
    questions: Array,
    dateCreation: String
    /*questions: [{
      type:Schema.Types.ObjectId,
      ref:'questions'
    }]*/
});

const Questionnaire = mongoose.model('questionnaires', questionnaireSchema)

module.exports = Questionnaire;