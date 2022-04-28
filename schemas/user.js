const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    nickName: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
    },
    gender: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    userContent: {
        type: String
    },
    userProfile: {
        type: Array
    },
    userInterest: {
        type: Array
    },
    address: {
        type: String,
    },
    reviewCnt: {
        type: Number,
    },
    like: {
        type: Array,
    },
});
module.exports = mongoose.model('User', UserSchema);
