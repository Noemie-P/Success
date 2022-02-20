const Answer = require("../models/answer_model");
const Questionnaire = require("../models/questionnaire_models");
const User = require("../models/user_models");

exports.saveAnswer = (req, res, next) => {
    if (req.body.length <= 0) {
        res.status(400).send({ message: "Le contenu ne peux pas être vide" });
        return;
    }

    //Création de l'objet
    const newAnswer = new Answer({
        id_questionnaire: req.body.questionnaireID,
        id_user: req.body.userID,
        note: req.body.note,
        noteTotal:req.body.noteTotal,
        answers: req.body.answers ? req.body.answers : false,
        statut: req.body.questionnaireStatut,
        datePassage: req.body.datePassage
    });

    newAnswer.save(err => {
        if (err) return res.status(500).send(err);
        res.status(200).send(newAnswer);
        return});
},

exports.getAnswers = (req, res, next) => {
    Answer.find({id_user:req.params.id})
    .populate('id_questionnaire')
    .populate('id_user')
    .then(data => {
      res.json(data);
  })
  .catch(err => {
      res
          .status(500)
          .send({ message: err  });
          console.log(err)
  });
};

exports.getAllAnswers = (req, res, next) => {
    Answer.find()
    .populate('id_questionnaire')
    .populate('id_user')
    .then(data => {
      res.json(data);
  })
  .catch(err => {
      res
          .status(500)
          .send({ message: err  });
          console.log(err)
  });
};

exports.getUsersFromAnswers = (req, res, next) => {
    Answer.find({id_questionnaire:req.params.id})
    .populate('id_questionnaire')
    .populate('id_user')
    .then(data => {
      res.json(data);
  })
  .catch(err => {
      res
          .status(500)
          .send({ message: err  });
          console.log(err)
  });
};

exports.GradeQuestionnaire = (req, res, next) => {
    Answer.findOneAndUpdate(
        { _id: req.params.answerID },
        {note:req.body.note,
        statut: req.body.questionnaireStatut},
        { new: true },
        (err, user) => {
          if (err) res.send(err);
          res.json(user);
        }
      );
}