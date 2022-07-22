const expressAsyncHandler= require('express-async-handler');
const Food = require('../models/Food');

//create a new food
const createFoodCtrl = expressAsyncHandler(async(req, res)=>{
    const {name, category, price, cookingDuration, description, image} = req?.body;
    
    
    try {
        
       const newFood = await Food.create({
            name,
            category,
            price,
            cookingDuration,
            description,
            image   
           }); 

           res.status(201).json({
            message: "Food created Successfully",
            newFood
           })

    } catch (error) {
       res.json(error) 
    }
});

//update food
const updateFoodCtrl = expressAsyncHandler(async(req, res)=>{
    const id = req?.params?.id
    const { name, category, price, cookingDuration, description } = req?.body;
    try {
      const updatedFood = await Food.findByIdAndUpdate(
          id,
          {
            name,
            category,
            price,
            cookingDuration,
            description   
          },
          {
              new:true
          }
        );
        res.json({
            message:"Food updated successfully",
            updatedFood
        })  
    } catch (error) {
       res.json(error) 
    }
});

//Delete food
const deleteFoodCtrl = expressAsyncHandler(async(req, res)=>{

    try {
        delFood = await Food.findByIdAndDelete(req.params.id);
        res.json('Food Deleted')
    } catch (error) {
        res.json(error)
    }
});

//get food
const getFoodCtrl = expressAsyncHandler(async(req, res)=>{
    const id = req?.params?.id;
    try {
        const food = await Food.findById(id);
        res.json(food)
    } catch (error) {
        res.json(error)
    }
    
});

//get all foods 

const getAllFoods = expressAsyncHandler(async(req, res)=>{
    
    try {

       fds = await Food.find().sort({createdAt:-1})
       res.json(fds);

    } catch (error) {
        res.json(error)
    }
});

// @desc Search foods
// @route GET /foods/search/:keyword
// @access Public

const searchFoodsCtrl = expressAsyncHandler(async(req, res) => {
    const searchKeyword = req.params.searchKeyword;
    const regex = new RegExp(searchKeyword, 'ig')
    try {
      const searchedFoodProduct = await Food.find({$or: [{name:regex}, {description:regex}, {price:regex}]});
      res.json(searchedFoodProduct)
    } catch (error) {
        res.json(error)
    }
});

const getFoodCategoryCtrl = expressAsyncHandler(async(req, res)=> {
    const category = req.params.categoryName;

    try {
        const foods = await Food.find({ category })
        res.status(200).json(foods)
    } catch (error) {
        throw new Error('No Food of that category found')
    }
})

module.exports = {
     createFoodCtrl,
     updateFoodCtrl,
     deleteFoodCtrl,
     getFoodCtrl,
     getAllFoods,
     searchFoodsCtrl,
     getFoodCategoryCtrl,
    }
