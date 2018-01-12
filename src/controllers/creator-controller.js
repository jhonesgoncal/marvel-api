'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/creator-repository');
const config = require("../config");
const guid = require('guid');
const azure = require('azure-storage');

exports.get = async(req, res, next) => {
    try{
        var data = await repository.get();
        res.status(200).send(data);
    } catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
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
    contract.hasMinLen(req.body.fullName, 3, 'O nome deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 3, 'A descricao deve conter pelo menos  3 caracteres.');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    try{
        let data = await repository.create({
            fullName: req.body.fullName,
            description: req.body.description,
            image : req.body.image
        });
        res.status(201).send({ 
            message: 'Creator cadastrado com sucesso!'
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
    contract.hasMinLen(req.body.fullName, 3, 'O nome deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 3, 'A descricao deve conter pelo menos  3 caracteres.');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try{
        await repository.update(req.params.id, req.body);
        res.status(200).send({ 
            message: 'Creator atualizado com sucesso!'
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
            message: 'Creator removido com sucesso!'
        });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}