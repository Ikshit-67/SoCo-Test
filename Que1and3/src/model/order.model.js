const mongoose = require("mongoose");

const order_schema = new mongoose.Schema({
    id:Number,
    cust_id:Number,
    price:Number,
    created_at:String
    
})

const Order = mongoose.model("order", order_schema);

module.exports = Order;
