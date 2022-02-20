const Group = require("../models/group_model.js");

exports.createGroup = (req, res) => {
    const newGroup = new Group({
        name:req.body.group.name
    });
    newGroup.save(err => {
        if (err) return res.status(500).send(err);
        res.status(200).send(newGroup);
        return
    });
};

exports.getGroups = (req, res, next) => {
    Group.find()
    .then(data => {
      res.json(data);
  })
  .catch(err => {
      res
          .status(500)
          .send({ message: "Error finding Groups"  });
          console.log(err)
  });
};

exports.getOneGroup = (req, res, next) => {
    Group.findOne({_id: req.params.id})
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

exports.deleteGroup =(req, res, next) => {
    Group.deleteOne({_id: req.params.id})
    .then(function(){
      console.log("data deleted");
    }).catch(function(error){
      console.log(_id)
      console.log(error);
    });
  };

exports.updateGroup = (req, res) => {
    Group.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true },
        (err, user) => {
        if (err) res.send(err);
        res.json(user);
        }
    );
};