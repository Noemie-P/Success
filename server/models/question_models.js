const mongoose = require("mongoose");
const config = require("../config/connect");

mongoose.connect('mongodb://'+ config.MONGODB_CREDENTIALS +'/success',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à Question réussie !'))
  .catch(() => console.log('Connexion à Question échouée !'));

const Schema = mongoose.Schema;

const questionSchema = new Schema ({
    question_enonce: String,
    question_type:String,
    question_note:Number,
    question_time:Number,
    catégorie:{ type: Schema.Types.ObjectId, ref: 'categories' },
    question_id_questionnaire: String,
    question_answers: Array
});

const Questionnaire = mongoose.model('questions', questionSchema)

module.exports = Questionnaire;