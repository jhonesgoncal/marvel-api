'use strict'
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async() => {
    const res = await Customer.find({},'_id name email');
    return res;
}

exports.getById = async(id) => {
    const res = await Customer.findById(id);
    return res;
}

exports.create = async(data) => {
    var customer = new Customer(data);
    await customer.save();
}

exports.update = async(id,data) => {
   await Customer
        .findByIdAndUpdate(id, {
            $set: {
                name: data.name,
                email: data.email
            }
        });
}

exports.delete = async(id) => {
    await Customer.findOneAndRemove(id)
}

exports.authenticate = async(data) => {
    const res = await Customer.findOne({
        email: data.email, 
        password: data.password
    });
    return res;
}