const expressAsyncHandler= require('express-async-handler');
const client = require('twilio')('ACb5f15dfc57c6c8f0d531d1116f3f0aa8', '4c6a904d6580d3e9e0ae6be21f31dbe1');
const Order = require('../models/Order');
require('dotenv').config();

//create order
const createOrderCtrl = expressAsyncHandler(async(req, res)=>{
    const { totalPrice, deliveryFee, address, foods, paymentMethod} = req.body;
    
    try {
        const newOrder = await Order.create({
          customer:req?.user?._id,
          foods,
          totalPrice,
          deliveryFee,
          address,
          paymentMethod
        })
        res.status(201).json({
          message:"Order Created Successfully",
          newOrder
        })

        client.messages
        .create({
          body: `Hello ${req?.user?.userName}, We have received your Order, with ID: ${newOrder?._id}
           priced at KES ${newOrder?.totalPrice} to be delivered at ${newOrder?.address}`,
          from: '+16672225016',
          to: `+254${req?.user?.phone?.slice(1)}`
        })
       .then(message => console.log(message.sid));

    } catch (error) {
        res.json(error)
    }
});

//update order 
const updateOrderCtrl = expressAsyncHandler(async(req, res)=>{
    try {
       const updatedOrder = await Order.findByIdAndUpdate(
           req?.params?.id,
           {
               $set: req?.body,
           },
           {
               new: true,
           }
       );
       res.json(updatedOrder)
    } catch (error) {
       res.json(error)
    }
});

//delete  order
const deleteUserOrderCtrl = expressAsyncHandler(async(req, res)=>{
    try {
        await Order.findByIdAndDelete(req?.params?.orderId);
        res.json("Order has been deleted") 
    } catch (error) {
        res.json(error)
    }
});

//get user order or orders
const getUserOrderCtrl = expressAsyncHandler(async(req, res)=>{
    try {
        const customerOrders = await Order.find({customer:req.user._id}).populate("customer", {password: 0})
        res.status(200).json(customerOrders)
    } catch (error) {
        res.json(error)
    }
});

//get all users' orders 
const getAllUsersOrdersCtrl = expressAsyncHandler(async(req, res)=>{
    try {
        const orders = await Order.find().sort({createdAt:-1}).populate("customer", {password:0})
        res.status(200).json(orders) 
    } catch (error) {
        res.json(error)
    }
})




const getASpecificOrderCtrl = expressAsyncHandler(async(req, res)=>{
    try {
      const orderDetails = await Order.findOne({_id:req?.params?.orderId})
      .populate("customer", { password:0});

      res.status(200).json(orderDetails)
    } catch (error) {
      res.json(error)
    }
});

const orderDeliveredCtrl = expressAsyncHandler(async(req, res)=>{
  const filteredOrderId = {_id:req?.params?.orderId};
  const updatedBody = { isDelivered: true}
  try {
    const deliveredOrder = await Order.findOneAndUpdate(filteredOrderId, updatedBody, { new: true})

    res.status(200).json(deliveredOrder)
  } catch (error) {
    res.json(error)
  }
})




//get monthly income of a particular queried product
// const getProductMonthlyIncomeCtrl = expressAsyncHandler(async(req, res)=>{
//     const productId = req.query.pid;
//     const date = new Date();
//     const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//     const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

//     try {
//         const income = await Order.aggregate([
//           {
//             $match: {
//               createdAt: { $gte: previousMonth },
//               ...(productId && {
//                 products: { $elemMatch: { productId } },
//               }),
//             },
//           },
//           {
//             $project: {
//               month: { $month: "$createdAt" },
//               sales: "$amount",
//             },
//           },
//           {
//             $group: {
//               _id: "$month",
//               total: { $sum: "$sales" },
//             },
//           },
//         ]);
//         res.status(200).json(income);
//       } catch (err) {
//         res.status(500).json(err);
//       }
  
// });

module.exports = {
    createOrderCtrl,
    updateOrderCtrl,
    deleteUserOrderCtrl,
    getUserOrderCtrl,
    getAllUsersOrdersCtrl,
    getASpecificOrderCtrl,
    orderDeliveredCtrl,
    

}