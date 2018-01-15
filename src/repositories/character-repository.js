'use strict'
const mongoose = require('mongoose');
const Character = mongoose.model('Character');


exports.get = async() => {
    const res = await Character.find();
    return res;
}

exports.getById = async(id) => {
    const res = await Character.findById(id);
    return res;
}

exports.create = async(data) => {
    var character = new Character(data);
    await character.save();
    return character;
}

exports.update = async(id,data) => {
    await Character
        .findByIdAndUpdate(id, {
            $set: {
                name: data.name,
                description: data.description,
                image: data.image
            }
        });
}

exports.delete = async(id) => {
    await Character.findOneAndRemove(id)
}






