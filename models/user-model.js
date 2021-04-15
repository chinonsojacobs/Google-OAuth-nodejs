const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const UserSchema = new Schema({
    username: String,
    googleID: String,
    thumbnail: String
});

//model
const User = mongoose.model('user', UserSchema);

module.exports = User;