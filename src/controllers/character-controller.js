'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/character-repository');
const config = require("../config");
const guid = require('guid');
const azure = require('azure-storage');



exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 3, 'A descricao deve conter pelo menos  3 caracteres.');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    try{
        let data = await repository.create({
            name: req.body.name,
            description: req.body.description,
            image : req.body.image
        });
        res.status(201).send(data);
    }catch(e){
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
   
}

exports.delete = async(req, res, next) => {
    try{
        await repository.delete(req.params.idCharacter)
        res.status(200).send({ 
            message: 'Produto removido com sucesso!'
        });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}