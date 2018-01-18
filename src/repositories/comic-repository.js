'use strict'
const mongoose = require('mongoose');
const Comic = mongoose.model('Comic');

exports.get = async() => {
    const res = await Comic.find({})
        .populate('characters', 'name description thumbnail')
        .populate('creators', 'fullName description thumbnail')
        .populate('stories', 'title');
    return res;
}

exports.getById = async(id) => {
    const res = await Comic.findById(id)
        .populate('characters', 'name description thumbnail')
        .populate('creators', 'fullName description thumbnail')
        .populate('stories', 'title');
    return res;
}

exports.create = async(data) => {
    var comic = new Comic(data);
    await comic.save();
    return comic;
}


exports.includeCharacter = async(id, data) => {
    await Comic
        .findByIdAndUpdate(id, {
            $addToSet: {
                characters: data.character
            }
        });
}

exports.getCharacters = async(id, data) => {
    const res = await Comic.findOne({
            _id: id
    }, 'creators')
    .populate('creators', 'name description thumbnail');
    return res;
}

exports.includeCreator = async(id, data) => {
    await Comic
        .findByIdAndUpdate(id, {
            $addToSet: {
                creators: data.creator
            }
        });
}

exports.getCreators = async(id, data) => {
    const res = await Comic.findOne({
            _id: id
    }, 'creators')
    .populate('creators', 'fullName description thumbnail');
    return res;
}

exports.includeStorie = async(id, data) => {
    await Comic
        .findByIdAndUpdate(id, {
            $addToSet: {
                stories: data.storie
            }
        });
}

exports.getStories = async(id, data) => {
    const res = await Comic.findOne({
            _id: id
    }, 'creators')
    .populate('stories', 'title');
    return res;
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

