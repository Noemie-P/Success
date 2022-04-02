var express = require("express");
var app = express();
const morgan =require("morgan");
var cors = require("cors");
const QuestionnaireController = require("./controllers/questionnaire_controller");
const userController = require("./controllers/user_controller");
const answerController = require("./controllers/answer_controller");
const categoryController = require("./controllers/category_controller");
const groupController = require("./controllers/group_controller");
var auth = require("./config/auth")
var Questionnaire = require("./models/questionnaire_models.js");

//var corsOptions = {
    //origin: "http://localhost:8080"
//};

//app.use(express.json());
app.use(express.json({limit: '10mb', extended: true}));
app.use(express.urlencoded({limit: '10mb', extended: true}));
//app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(morgan("dev"));

//partie questionnaire
app.post ("/creerQuestionnaire", function(req, res){
    console.log("page créer");
    QuestionnaireController.createQuestionnaire(req, res);
});

app.post ("/createExam", function(req, res){
    console.log("page créer");
    QuestionnaireController.createExam(req, res);
});

app.get("/getQuestionsFromCategory/:id", QuestionnaireController.getQuestionsFromCategory);
app.delete("/deleteQuestion/:id", QuestionnaireController.deleteQuestion);

app.post ("/creerQuestions", function(req, res){
    console.log("page créer");
    QuestionnaireController.createQuestions(req, res);
})

app.get("/getQuestion/:id", QuestionnaireController.getQuestion);
app.put("/updateQuestion/:id", QuestionnaireController.updateQuestion);

app.post ("/creercategorie", function(req, res){
    console.log("page créer");
    categoryController.createCategory(req, res);
})

app.post ("/faireQuestionnaire", function(req, res,next){
    console.log("page questionnaire");
   QuestionnaireController.findQuestions(req, res,next);
    
})
app.get ("/getQuestionnaire", function(req, res){
    console.log("page get questionnaire");
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
    
});

app.delete("/deleteQuestionnaire/:id", QuestionnaireController.deleteQuestionnaire);

//partie categorie

app.get ("/getCategory", function(req, res){
    console.log("page get category");
    categoryController.getCategory(req, res);
  });

app.get("/getCategory/:id", categoryController.getOneCategory);
app.put("/updateCategory/:id", categoryController.updateCategory);
app.delete("/deleteCategory/:id", categoryController.deleteCategory);

app.post("/validerCode", function(req,res, next){
    console.log("page code validé");
    QuestionnaireController.validerCode(req,res, next);
})
//partie answers

app.get("/getAnswers/:id", answerController.getAnswers);
app.get("/getAllAnswers", answerController.getAllAnswers);
app.post ("/saveAnswer", answerController.saveAnswer);
app.get("/getUsersFromAnswers/:id", answerController.getUsersFromAnswers);
app.put("/GradeQuestionnaire", answerController.GradeQuestionnaire);


// partie user
app.post ("/register", userController.registerNewUser);
app.post ("/login", userController.loginUser);
app.post("/login-2FA", userController.login2FA);
app.get ("/me", auth,userController.getUserDetails);
app.get("/getUsers", userController.getUsers);
app.post("/verify-2FA", userController.verify2FA);
//app.get("/getUsersPopulate", userController.getUsersPopulate);
app.get("/getOneUser/:id", userController.getOneUser);
app.get("/getUsersFromGroup/:id", userController.getUsersFromGroup);
app.delete("/deleteUser/:id", userController.deleteUser);
app.put("/updateUser/:id", userController.updateUser);
app.put("/logOutUser/:id", userController.logOutUser);

//partie groups

app.post ("/createGroup", groupController.createGroup);
app.get("/getGroups", groupController.getGroups);
app.get("/getOneGroup/:id", groupController.getOneGroup);
app.delete("/deleteGroup/:id", groupController.deleteGroup);
app.put("/updateGroup/:id", groupController.updateGroup);



app.listen(3000);

module.exports= app;