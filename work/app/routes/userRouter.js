const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const getUser = require('./middlewares/getuser')

// get all 
router.get('/', async (req, res) => {
    // res.send('get all users');
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get one
router.get('/:id', getUser, (req, res) => {
    res.send(res.user);
});

// create one
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try {
       const newUser = await user.save(); 
       res.status(201).json(newUser);
    } catch (err) {
       res.status(400).json({ message: err.message }); 
    }
});

// update one (patch to only update the property provided by user and not the whole object)
router.patch('/:id', getUser, async (req, res) => {
    if(req.body.name != null) {
        res.user.name = req.body.name;
    }
    if(req.body.email != null) {
        res.user.email = req.body.email;
    }
    if(req.body.password != null) {
        res.user.password = req.body.password;
    }   
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// delete one
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: 'Deleted user' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// middleware to find user based on id. Must be as a function (not arrow notation) to get hoisted.
// async function getUser_old(req, res, next) {
//     // if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//     if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
//         return res.status(404).json({ message: 'not a valid id'});
//     }
//     try {
//         user = await User.findById(req.params.id);
//         if (user == null) {
//             return res.status(404).json({ message: 'Cannot find user: '+req.params.id });
//         }
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
//     res.user = user; //set the user on the response object and forward it to next middleware function
//     next();
// }

module.exports = router;
