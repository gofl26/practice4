const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    postTitle: {
        type: String,
        required: true,
    },
    postDesc: {
        type: String,
        required: true,
    },
    postCategory: {
        type: String,
        required: true,
    },
    datemake: {
        type: String,
        required: true,
    },
    datemate: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    maxMember: {
        type: String,
        required: true,
    },
    nowMember: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    adress: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});
PostSchema.virtual('PostId').get(function () {
    return this._id.toHexString();
});
PostSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Posts', PostSchema);
