const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/connect");

mongoose.connect('mongodb://'+ config.MONGODB_CREDENTIALS +'/success',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à User réussie !'))
  .catch(() => console.log('Connexion à User échouée !'));

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    user_name: {
      type:String,
      required:true
    },
    type: {
     type:String
    },
    groupe: {
      type: Schema.Types.ObjectId, 
      ref:'groups'
    },
    questionnaires: [
      {
        id_questionnaire:String,
        note:Number,
        date_passage:String,
        passed:Boolean
      }
    ],
    password: {
      type: String,
      required:true
    },
    mail: {
      type: String,
      required:true
    },
    secret: {
      type: String,
      required:true
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
});

//this method will hash the password before saving the user model
userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//this method generates an auth token for the user
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  //const token = jwt.sign({ _id: user._id, user_name: user.user_name, type: user.type}, "secret" );
  const token = jwt.sign({user: user}, "secret" );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

//this method search for a user by email and password.
userSchema.statics.findByCredentials = async (user_name, password) => {
  const user = await User.findOne({ user_name });
  if (!user) {
    throw new Error({ "error":"Invalid user details" })
    console.log("error: Invalid user details" );
  }
  console.log (password);
  console.log (user.password);
  const isPasswordMatch = await bcrypt.compare( password, user.password);
  console.log (isPasswordMatch);
  if (!isPasswordMatch) {
    throw new Error({ "error": "Invalid password details" })
    console.log( "error: Invalid password details" );
  }
  return user;
};

const User = mongoose.model('users', userSchema)

module.exports = User;