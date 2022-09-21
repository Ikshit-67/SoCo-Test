const mongoose = require("mongoose");

const customer_schema = new mongoose.Schema({
    id:Number,
    cust_id:Number,
    name:String,
    city:String
})

const Customer = mongoose.model("customer", customer_schema);
module.exports = Customer;