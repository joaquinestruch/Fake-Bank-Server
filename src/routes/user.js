const express = require("express");

const userSchema = require("../models/user");
const router = express.Router();

//create user
router.post("/users", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ "message": error });
    });
});

//get all users
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ "message": error });
    });
});

//get specific user
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ "message": error });
    });
});

// filter user for username and password
router.get('/users/search/forUsername/:name/:password', (req, res) => {
  const { name, password } = req.params;

  userSchema.find({ name, password })
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.json({ message: error });
    });
});


// update array
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { transaccions } = req.body;
  userSchema
    .updateOne({_id:id}, {$push: {transaccions: transaccions}})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ "message": error });
    });
});


// subtract money
router.put('/users/:id/subtract', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const user = await userSchema.findOneAndUpdate(
      { _id: id },
      { $inc: { money: -amount } },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// add money
router.put('/users/:id/add', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const user = await userSchema.findOneAndUpdate(
      { _id: id },
      { $inc: { money: amount } },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// delete user
router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
      .deleteOne({_id:id})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json({ "message": error });
      });
  });

module.exports = router;
