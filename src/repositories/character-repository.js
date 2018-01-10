'use strict'
const mongoose = require('mongoose');
const Character = mongoose.model('Character');

exports.create = async(data) => {
    var character = new Character(data);
    await character.save();
    return character;
}






