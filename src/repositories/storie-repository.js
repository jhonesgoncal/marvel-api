'use strict'
const mongoose = require('mongoose');
const Storie = mongoose.model('Storie');


exports.get = async() => {
    const res = await Storie.find();
    return res;
}

exports.getById = async(id) => {
    const res = await Storie.findById(id);
    return res;
}

exports.create = async(data) => {
    var storie = new Storie(data);
    await storie.save();
    return storie;
}

exports.update = async(id,data) => {
    await Storie
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title
            }
        });
}

exports.delete = async(id) => {
    await Storie.findByIdAndRemove(id)
}






