const mongoose = require("mongoose");
const config = require("../config/connect");

mongoose.connect('mongodb://'+ config.MONGODB_CREDENTIALS +'/success',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à Answer réussie !'))
  .catch(() => console.log('Connexion à Answer échouée !'));

const Schema = mongoose.Schema;

const answerSchema = new Schema ({
    id_questionnaire: {
      type: Schema.Types.ObjectId, 
      ref:'questionnaires'
    },
    id_user:{
      type: Schema.Types.ObjectId, 
      ref:'users'
    },
    answers:Array,
    note:Number,
    noteTotal:Number,
    statut:String,
    datePassage:Date
});

const Answer = mongoose.model('answers', answerSchema)

module.exports = Answer;