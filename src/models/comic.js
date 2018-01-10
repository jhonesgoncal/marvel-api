'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    characters:[{
        type: Object
    }],
    stories:[{
        type: String
    }],
    creators:[{
        type: Object
    }],
    image: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Comic', schema);
