const Question = require("../models/question_models");
var Questionnaire = require("../models/questionnaire_models");
//var User = require("../models/user_models");

exports.findQuestions = (req, res, next) => {
    //Question.find({question_id_questionnaire: req.body.questionnaireID})
    Question.find({catégorie: req.body.categorieID})
    .then(data => {
        res.send(JSON.stringify(data));
    })
    .catch(err => {
        res
            .status(500)
            .send({ message: "Error retrieving Questions"  });
            console.log(err)
    });
};

exports.getQuestion = (req, res, next) => {
    Question.findOne({_id: req.params.id})
    .then(data => {
        res.send(JSON.stringify(data));
    })
    .catch(err => {
        res
            .status(500)
            .send({ message: "Error retrieving the Question"  });
            console.log(err)
    });
};

exports.updateQuestion = (req, res) => {
    Question.findOneAndUpdate(
      { _id: req.params.id },
      {
        question_enonce:req.body.question.question_enonce,
        question_type: req.body.question.question_type,
        question_note: req.body.question.question_note,
        question_time: req.body.question.question_time,
        question_answers:req.body.answers},
      { new: true },
      (err, user) => {
        if (err) res.send(err);
        res.json(user);
      }
    );
  };

exports.getQuestionsFromCategory = (req, res, next) => {
    Question.find({catégorie: req.params.id})
    .populate('catégorie')
    .then(data => {
        res.send(JSON.stringify(data));
    })
    .catch(err => {
        res
            .status(500)
            .send({ message: "Error retrieving Questions"  });
            console.log(err)
    });
}

exports.createQuestions = (req, res) => {
    console.log(req.body.questions)

    const newQuestion = new Question({
        question_enonce:req.body.question.question_enonce,
        question_type: req.body.question.question_type,
        question_note: req.body.question.question_note,
        question_time: req.body.question.question_time,
        catégorie:req.body.categoryID,
        question_id_questionnaire: req.body.questionnaireID,
        question_answers:req.body.answers
    });
    newQuestion.save(err => {
    if (err) return res.status(500).send(err);
    res.status(200).send(newQuestion);
    console.log("success!")
    return
    
        });
};

exports.deleteQuestion = (req, res) => {
    Question.deleteOne({_id: req.params.id})
    .then(function(){
      console.log("data deleted");
    }).catch(function(error){
      console.log(_id)
      console.log(error);
    });
};

exports.createQuestionnaire = (req, res) => {
    const newQuestionnaire = new Questionnaire({
        questionnaire_name:req.body.questionnaires.questionnaire_name,
        code:req.body.questionnaires.code
    });
    newQuestionnaire.save(err => {
    if (err) return res.status(500).send(err);
    res.status(200).send(newQuestionnaire);
    return
    });
};

exports.createExam = (req, res) => {
    const newQuestionnaire = new Questionnaire({
        questionnaire_name:req.body.questionnaires.questionnaire_name,
        code:req.body.questionnaires.code,
        categorie:req.body.categoryID,
        groupe:req.body.groupID,
        dateCreation: req.body.dateCreation
    });

    newQuestionnaire.save(err => {
    if (err) return res.status(500).send(err);
    res.status(200).send(newQuestionnaire);
    return
    });
};

exports.getQuestionnaire = (req, res) => {
    Questionnaire.find()
    .then(data => {
      res.json(data);
  })
  .catch(err => {
      res
          .status(500)
          .send({ message: "Error finding Users"  });
          console.log(err)
  });
};

exports.deleteQuestionnaire =(req, res, next) => {
    Questionnaire.deleteOne({_id: req.params.id})
    .then(function(){
      console.log("data deleted");
    }).catch(function(error){
      console.log(_id)
      console.log(error);
    });
  };


exports.validerCode = (req, res, next) => {
    Questionnaire.findOne({code: req.body.questionnaireCode})
        .populate("categorie")
        .populate("groupe")
        .then(data => {
            res.send(JSON.stringify({
                "isCodeGood": !(!data),
                "questionnaireData": data
            }));
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Survey with id " + req.body.questionnaireCode });
        });
}