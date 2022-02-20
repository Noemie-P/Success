const Category = require("../models/category_model.js");

exports.createCategory = (req, res) => {
    const newCategory = new Category({
        name:req.body.category.name
    });
    newCategory.save(err => {
        if (err) return res.status(500).send(err);
        res.status(200).send(newCategory);
        return
    });
};

exports.getCategory = (req, res) => {
    Category.find()
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

exports.getOneCategory = (req, res) => {
  Category.findOne({_id:req.params.id})
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

exports.deleteCategory =(req, res, next) => {
    Category.deleteOne({_id: req.params.id})
    .then(function(){
      console.log("data deleted");
    }).catch(function(error){
      console.log(_id)
      console.log(error);
    });
  };

exports.updateCategory = (req, res) => {
  Category.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, user) => {
      if (err) res.send(err);
      res.json(user);
    }
  );
};