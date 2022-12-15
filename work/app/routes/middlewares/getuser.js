const mongoose = require('mongoose');
const User = require('../../models/user');
module.exports = async function getUser(req, res, next) {
    // if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ message: 'not a valid id'});
    }
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user: '+req.params.id });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user; //set the user on the response object and forward it to next middleware function
    next();
}