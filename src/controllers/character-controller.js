'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/character-repository');
const config = require("../config");
const guid = require('guid');
const utils = require('../utils');
const azure = require('azure-storage');

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
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 3, 'A descricao deve conter pelo menos  3 caracteres.');
    contract.isNotJpgOrPng(req.body.thumbnail.extension, 'O thumbnail deve ser JPG ou PNG');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    try{
        const resultThumbnail = await utils.saveThumbnail('character', req.body.thumbnail.path, req.body.thumbnail.extension);

        const data = await repository.create({
            name: req.body.name,
            description: req.body.description,
            thumbnail: {
                path: resultThumbnail.path,
                extension: resultThumbnail.extension
            }
        });
        res.status(201).send(data);
    }catch(e){
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
   
}

exports.put = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 3, 'A descricao deve conter pelo menos  3 caracteres.');
    contract.isNotJpgOrPng(req.body.thumbnail.extension, 'O thumbnail deve ser JPG ou PNG');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try{
        const resultThumbnail = await utils.saveThumbnail('character', req.body.thumbnail.path, req.body.thumbnail.extension);

        await repository.update(req.params.id, req.body, resultThumbnail);
        res.status(200).send({ 
            message: 'Character atualizado com sucesso!'
        });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
   
};

exports.delete = async(req, res, next) => {
    try{
        await repository.delete(req.params.id)
        res.status(200).send({ 
            message: 'Character removido com sucesso!'
        });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}