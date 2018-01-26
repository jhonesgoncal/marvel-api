'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/comic-repository');
const config = require("../config");
const guid = require('guid');
const azure = require('azure-storage');
const utils = require('../utils');

exports.get = async(req, res, next) => {
    try{
        var data = await repository.get();
        res.status(200).send(data);
    } catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }title
}

exports.getById = async(req, res, next) => {
    try{
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
    
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 3, 'A descricao deve conter pelo menos  3 caracteres.');
    contract.isNotJpgOrPng(req.body.thumbnail.extension, 'O thumbnail deve ser JPG ou PNG');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    try{
        const resultThumbnail = await utils.saveThumbnail('comic', req.body.thumbnail.path, req.body.thumbnail.extension);

        const data = await repository.create({
            title: req.body.title,
            description: req.body.description,
            thumbnail: {
                path: resultThumbnail.path,
                extension: resultThumbnail.extension
            }
        });
        res.status(201).send({ 
            message: 'Comic cadastrado com sucesso!'
        });
    }catch(e){
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
   
}

exports.put = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 3, 'A descricao deve conter pelo menos  3 caracteres.');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try{
        if(contract.isUrl(req.body.thumbnail.path)){
           const resultThumbnail = req.body.thumbnail;
        }else{
           const resultThumbnail = await utils.saveThumbnail('comic', req.body.thumbnail.path, req.body.thumbnail.extension);
        }
        await repository.update(req.params.id,{
            title: req.body.title,
            description: req.body.description,
            thumbnail: {
                path: resultThumbnail.path,
                extension: resultThumbnail.extension
            }
        });
        res.status(200).send({ 
            message: 'Comic atualizado com sucesso!'
        });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
   
};

exports.includeCharacter = async(req, res, next) => {

    try{
        await repository.includeCharacter(req.params.id, req.body)
        res.status(200).send({ 
            message: 'Character adicionado com sucesso!'
        });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição' + e.message
        });
    }
}

exports.getCharacters = async(req, res, next) => {
    try{
        var data = await repository.getCharacters(req.params.id);
        res.status(200).send(data.characters);
    }catch(e){
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
    
}

exports.includeCreator = async(req, res, next) => {

    try{
        await repository.includeCreator(req.params.id, req.body)
        res.status(200).send({ 
            message: 'Creator adicionado com sucesso!'
        });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição' + e.message
        });
    }
}

exports.getCreators = async(req, res, next) => {
    try{
        var data = await repository.getCreators(req.params.id);
        res.status(200).send(data.creators);
    }catch(e){
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
    
}

exports.includeStorie = async(req, res, next) => {

    try{
        await repository.includeStorie(req.params.id, req.body)
        res.status(200).send({ 
            message: 'Storie adicionado com sucesso!'
        });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição' + e.message
        });
    }
}

exports.getStories = async(req, res, next) => {
    try{
        var data = await repository.getStories(req.params.id);
        res.status(200).send(data.stories);
    }catch(e){
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
    
}

exports.delete = async(req, res, next) => {
    try{
        await repository.delete(req.params.id)
        res.status(200).send({ 
            message: 'Comic removido com sucesso!'
        });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}