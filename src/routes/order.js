const express = require('express');
const { 
    createOrderCtrl, 
    getUserOrderCtrl,
     getAllUsersOrdersCtrl,
      getASpecificOrderCtrl,
       updateOrderCtrl, deleteUserOrderCtrl, orderDeliveredCtrl} = require('../controllers/orderCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

const orderRoute = express.Router()

orderRoute.post('/', authMiddleware, createOrderCtrl)
orderRoute.get("/myorder", authMiddleware, getUserOrderCtrl)
 orderRoute.get('/', authMiddleware, getAllUsersOrdersCtrl)
orderRoute.get('/:orderId', authMiddleware, getASpecificOrderCtrl)
orderRoute.put('/:orderId', authMiddleware, updateOrderCtrl)
orderRoute.delete('/:orderId', authMiddleware, deleteUserOrderCtrl)
orderRoute.put('/:orderId', authMiddleware, orderDeliveredCtrl)




module.exports = orderRoute;