const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    name: {
      type:String,
      required:true
    },
    category: {
      type:String,
      required:true
    },
    price: {
      type:Number,
      required:true,
    },
    cookingDuration:{
      type:Number,
      required:true,
      default:30
    },
    image: {
      type:String,
      required:true
    },
    description : {
      type: String,
      required:true
    },
    qtyToBuy:{
      type:Number,
      default:1
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", FoodSchema);