const { route } = require("../index.js");
const User = require("../models/user_models.js");
const { authenticator } = require('otplib');
const QRCode = require('qrcode');

exports.registerNewUser = async (req, res) => {
    //try {
        //console.log(isUser);
         //if (isUser.length >= 1) {
           //return res.status(409).json({
            // message: "user name already in use"
          // });
         //}
         const mail = req.body.mail;
         const secret = authenticator.generateSecret();
         const user = new User({
           user_name: req.body.user_name,
           type: req.body.type,
           groupe:req.body.groupe,
           password: req.body.password,
           mail: req.body.mail,
           secret: secret
         });
         let data = await user.save();
         QRCode.toDataURL(authenticator.keyuri(mail, 'Success', secret), (err, qr) => {
          if (err) {
            throw err
          }
          let url = authenticator.keyuri(mail, 'Success', secret);
          console.log(qr);
          //req.session.qr = url
          //req.session.email = email
          res.status(201).json({ data, url, secret, qr });})
         //const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
         //res.status(201).json({ data});
       //} catch (err) {
         //res.status(400).json({ err: err });
       //}
};
exports.loginUser = async (req, res, next) => {
   try {
        const user_name = req.body.user_name
        const password = req.body.password
        const mail = req.body.mail
        console.log(user_name);
        console.log(password);
        const user = await User.findByCredentials(user_name, password);
        if (!user) {
          return res.status(401).json({ error: "Login failed! Check authentication credentials" });
        }
        res.status(201).json({ user });
        /*secret = authenticator.generateSecret();
        let url = authenticator.keyuri(mail, 'Success', secret);
        QRCode.toDataURL(authenticator.keyuri(mail, 'Success', secret), (err, qr) => {
          if (err) {
            throw err
          }
          //req.session.qr = url;
          //req.session.user_name = user_name;
          //res.redirect('/verify-2fa')
          res.status(201).json({ user, url, secret, qr });
        })*/
        
      } catch (err) {
        res.status(400).json({ err: err });
        console.log("problème avec la requete")
     }
};

exports.login2FA = async (req, res, next) => {
  const mail = req.body.mail,
    code = req.body.code,
    secret = req.body.secret;
  verifyLogin(mail, code, secret, req, res, '/')
};

exports.verify2FA = (req, res) =>{
  console.log(req.body.mail);
  if (!req.body.mail) {
    return res.redirect('/')
  }

  const mail = req.body.mail,
    code = req.body.code,
    secret = req.body.secret;
    console.log("code:"+ code);
    console.log("secret:"+ secret);
  verifyLogin(mail, code, secret, req, res, '/')
}

function verifyLogin (mail, code, secret, req, res, failUrl) {
  //load user by email
  console.log("code:"+ code);
  console.log("secret:"+ secret);
      if (!authenticator.check(code, secret)) {
        //redirect back
        return res.redirect(failUrl)
      }
      User.findOne({secret: secret})
        .then(data => {
          res.json(data);
      })
      .catch(err => {
          res
        .status(500)
        .send({ message: "Error finding Users"  });
        console.log(err)
      });
      //correct, add jwt to session
      /*req.session.qr = null
      req.session.email = null
      req.session.token = jwt.sign(email, 'supersecret')*/

      //redirect to "private" page
      //res.status(201).json({ user, code, secret })
}

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