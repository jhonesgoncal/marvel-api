'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Creator', schema);
