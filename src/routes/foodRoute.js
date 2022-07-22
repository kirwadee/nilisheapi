const express = require('express');
const upload = require('../../utils/cloudinary');
const {
     createFoodCtrl, 
     updateFoodCtrl,
     deleteFoodCtrl,
     getFoodCtrl,
     getAllFoods, 
     searchFoodsCtrl,
     getFoodCategoryCtrl
    } = require('../controllers/foodCtrl');
const authMiddleware = require('../middlewares/authMiddleware');


const foodRoute = express.Router();

foodRoute.post("/", authMiddleware, createFoodCtrl);
foodRoute.put("/:id", authMiddleware, updateFoodCtrl);
foodRoute.delete("/:id", authMiddleware, deleteFoodCtrl);
foodRoute.get("/:id", getFoodCtrl);
foodRoute.get("/", getAllFoods);
foodRoute.get("/search/:keyword", searchFoodsCtrl);
foodRoute.get("/category", getFoodCategoryCtrl)


module.exports = foodRoute;