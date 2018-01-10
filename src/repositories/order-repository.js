'use strict'
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async() => {
    const res = await Order
                .find({}, 'number status customer items')
                .populate('customer', 'name')
                .populate('items.product', 'title');
    return res;
}

exports.getById = async(id) => {
    const res = await Order.findById(id);
    return res;
}

exports.create = async(data) => {
    var order = new Order(data);
    await order.save();
}

exports.delete = async(id) => {
    await Order.findOneAndRemove(id)
}

