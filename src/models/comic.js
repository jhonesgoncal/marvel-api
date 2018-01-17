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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character'
    }],
    stories:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Storie'
    }],
    creators:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Creator'
    }],
    thumbnail: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Comic', schema);
