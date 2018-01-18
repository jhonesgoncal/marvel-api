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

exports.update = async(id,data, thumbnail) => {
    await Character
        .findByIdAndUpdate(id, {
            $set: {
                name: data.name,
                description: data.description,
                thumbnail: {
                    path: thumbnail.path,
                    extension: thumbnail.extension
                }
            }
        });
}

exports.delete = async(id) => {
    await Character.findOneAndRemove(id)
}






