const { route } = require("../index.js");
const User = require("../models/user_models.js");

exports.registerNewUser = async (req, res) => {
    //try {
        //console.log(isUser);
         //if (isUser.length >= 1) {
           //return res.status(409).json({
            // message: "user name already in use"
          // });
         //}
         const user = new User({
           user_name: req.body.user_name,
           type: req.body.type,
           groupe:req.body.groupe,
           password: req.body.password
         });
         let data = await user.save();
         const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
         res.status(201).json({ data, token });
       //} catch (err) {
         //res.status(400).json({ err: err });
       //}
};
exports.loginUser = async (req, res, next) => {
   try {
        const user_name = req.body.user_name
        const password = req.body.password
        console.log(user_name);
        console.log(password);
        const user = await User.findByCredentials(user_name, password);
        if (!user) {
          return res.status(401).json({ error: "Login failed! Check authentication credentials" });
        }
        const token = await user.generateAuthToken();
        res.status(201).json({ user, token });
      } catch (err) {
        res.status(400).json({ err: err });
        console.log("problème avec la requete")
     }
};
exports.logOutUser = (req, res, next) =>{
    //const token = req.body.token;
    const tokens = req.body.tokens;
    console.log(tokens.lenght);
    //User.findOne({_id: req.params.id})
    //.update({$pull: { 'tokens': tokens[tokens.lenght]}}) 
    
    //.then(data => {
     // res.json(data);
  //})
  //.catch(err => {
      //res
          //.status(500)})

};
exports.getUserDetails = async (req, res) => {
    await res.json(req.userData);
};

exports.getUsers = (req, res, next) => {
    User.find()
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

exports.getOneUser = (req, res, next) => {
  User.findOne({_id: req.params.id})
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

exports.getUsersFromGroup =(req,res,next) => {
  User.find({groupe:req.params.id})
  .populate('groupe')
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

exports.deleteUser =(req, res, next) => {
  User.deleteOne({_id: req.params.id})
  .then(function(){
    console.log("data deleted");
  }).catch(function(error){
    console.log(_id)
    console.log(error);
  });
};

exports.updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, user) => {
      if (err) res.send(err);
      res.json(user);
    }
  );
};