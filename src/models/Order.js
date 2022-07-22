const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customer: {
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
  },
  totalPrice: {
    type:Number,
    required:true
  },
  deliveryFee: {
    type:Number,
    default:10.0
  },
  address:{
    type:String,
    default:"EldoPoly"
  },
  foods: [{}],
  isDelivered:{
    type:Boolean,
    default:false
  },
  paymentMethod:{
    type:String,
    default:"On Delivery"
  },
  orderDate:{
    type:Date,
    required:true,
    default:Date.now()
  },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
