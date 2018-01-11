'use strict'
const mongoose = require('mongoose');
const Comic = mongoose.model('Comic');

exports.get = async() => {
    const res = await Comic.find();
        return res;
}

exports.getById = async(id) => {
    const res = await Comic.findById(id);
    return res;
}

exports.create = async(data) => {
    var comic = new Comic(data);
    await comic.save();
    return comic;
}


exports.addCharacter = async(id, data) => {
    await Comic
        .findByIdAndUpdate(id, {
            $push: {
                characters: data
            }
        });
}


exports.update = async(id,data) => {
    await Comic
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                image: data.image,
                characters: data.characters
            }
        });
}

exports.delete = async(id) => {
    await Comic.findOneAndRemove(id)
}

