const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/success',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const Schema = mongoose.Schema;

const questionnaireSchema = new Schema ({
    questionnaire_name: String,
    code: Number,
    //questions: Array
    questions: [{
      type:Schema.Types.ObjectId,
      ref:'questions'
    }]
});

const Questionnaire = mongoose.model('questionnaires', questionnaireSchema)

module.exports = Questionnaire;