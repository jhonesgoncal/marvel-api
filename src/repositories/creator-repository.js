'use strict'
const mongoose = require('mongoose');
const Creator = mongoose.model('Creator');


exports.get = async() => {
    const res = await Creator.find();
    return res;
}

exports.getById = async(id) => {
    const res = await Creator.findById(id);
    return res;
}

exports.create = async(data) => {
    var creator = new Creator(data);
    await creator.save();
}

exports.update = async(id,data) => {
    await Creator
        .findByIdAndUpdate(id, {
            $set: {
                fullName: data.fullName,
                description: data.description,
                image: data.image
            }
        });
}

exports.delete = async(id) => {
    await Creator.findOneAndRemove(id)
}





