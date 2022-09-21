require("dotenv").config();
require("./configs/db.config");
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

const body_parser = require("body-parser");

app.use(express.json());

app.use(body_parser.json());

const Order = require("./model/order.model");
const Customer = require("./model/customers.model");

app.get("/", (req, res) => {
  res.status(200).json({ success: true, data: { msg: "Hello from backend!" } });
});


app.post("/create_order", async(req, res) => {
  console.log(req.body);
  const result = await Order(req.body).save();
  res.status(200).json({ success: true, data:result});
})

app.post("/create_customer", async(req, res) =>{
  const result = await Customer(req.body).save();
  res.status(200).json({success:true, data:result});
})

app.get("/allOrder", async(req, res) => {
  const result = await Order.find();
  res.status(200).json({ success: true, data: result });
});

app.get("/allCustomer", async(req, res) => {
  const result = await Customer.find();
  res.status(200).json({ success: true, data: result });
});

app.get("/queOne", async(req, res) => {
  const result = await Order.find({cust_id:1004}, {cust_id:1004, price:1, _id:0}).sort({"price":1}).skip(1).limit(1);
  res.status(200).json({data: result });
});

app.get("/queTwo", async(req, res) =>{
  const result = await Order.aggregate([{"$group" : {_id:"$cust_id", max_order:{$max:"$price"}}}]);
  res.status(200).json({data:result});
})

app.get("/queThree", async(req, res) =>{
  let cust_table = await Customer.find(); 
  const max_orders = await Order.aggregate([{"$group" : {_id:"$cust_id", max_order:{$max:"$price"}}}]);
  const result = [];
  cust_table.map((cust, indexC) =>{
    const res1 = {...cust,max_order:max_orders.filter((order,indexO) => order._id === cust.cust_id)[0].max_order}
    result.push(res1)
  });
  res.status(200).json({data:result});
})


app.listen(port, () => console.log(`Listening on Port ${port}`));
