const express = require('express');
const router = express.Router();


const Users = require('../models/users');


router.get('/', async (req, res) => {
  try {
    const users = await Users.find({});
    res.send({ users })
  } catch(err) {
    res.status(400).send({ error: err });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.send({ user });
  } catch (err) {
    res.status(404).send({ message: 'User not found!' });
  }
});


router.post('/', async (req, res) => {
  try {
    const newUser = await Users.create({ firstname: req.body.firstname,lastname: req.body.lastname, email: req.body.email, bio: req.body.bio,date: req.body.date});
     res.send({ newUser });
  } catch(err) {
    res.status(400).send({ error: err });
  }

});


router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body);
     res.send({ message: 'The user was updated' });
  } catch(err) {
    res.status(400).send({ error: err });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const removeUser = await Users.findByIdAndRemove(req.params.id);
     res.send({ message: 'The user was removed' });
  } catch(err) {
    res.status(400).send({ error: err });
  }
});


module.exports = router;