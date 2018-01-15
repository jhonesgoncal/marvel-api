'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/comic-repository');
const config = require("../config");
const guid = require('guid');
const azure = require('azure-storage');

exports.get = async(req, res, next) => {
    try{
        var data = await repository.get();
        res.status(200).send(data);
    } catch(e){
        console.log(e.message);
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

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    try{
        //Cria o Blob Service
        const blobSvc = azure.createBlobService(config.containerConnectionString);

        let filename = guid.raw().toString() + '.jpg';
        let rawdata = req.body.image;
        let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let type = matches[1];
        let buffer = new Buffer(matches[2], 'base64');

        //Salva imagem
        await blobSvc.createBlockBlobFromText('comic-images', filename, buffer, {
            contentType: type
        }, function (error, result, response){
            if(error){
                filename = 'default-comic.png'
            }
        });

        let data = await repository.create({
            title: req.body.title,
            description: req.body.description,
            image: 'https://marvelapi.blob.core.windows.net/comic-images/' + filename
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
        await repository.update(req.params.id, req.body);
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