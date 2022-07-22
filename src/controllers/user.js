const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../middlewares/generateToken");
const User = require("../models/User");


//@desc Register new User
//@route POST /users/register
//@access Public

const register = expressAsyncHandler(async(req, res)=>{
    const { userName, email, password, phone} = req?.body;

    //Query the database to check if the user exists prior registration
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error("User already Exists")
    }

    try {
        const newUser = await User.create({ userName, email, password, phone})

            res.status(201).json({
                userId:newUser._id,
                userName:newUser.userName,
                email:newUser.email,
                role:newUser.role,
            })
       
    } catch (error) {
        res.status(400)
        throw new Error("Invalid User Data")
    }
    
});

// @desc Auth user, get token
// @route POST /users/login
// @access Public
//login user
const loginHandler = expressAsyncHandler(async (req, res) => {
    const { email, password } = req?.body;
    //Find the user in db
    const userFound = await User.findOne({ email });
  
    //check if the user password match
  
    if (userFound && (await userFound?.matchPasswords(password))) {
      res.json({
        userId: userFound?._id,
        userName:userFound?.userName,
        email: userFound?.email,
        role: userFound?.role,
        phone:userFound?.phone,
        token: generateToken(userFound?._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Login credentials");
    }
  });


//@desc Get user profile
//@route GET /users/profile
//@access Private

const  getUserProfile = expressAsyncHandler(async(req, res) => {
    const id = req.params.id;

    try {
       const user = await User.findById(id)
       res.json({
           userId:user._id,
           userName:user.userName,
           email:user.email,
           phone:user.phone,
           role:user.role
       })
    } catch (error) {
        res.json(error)
    }
});

//@desc Update user profile
//@route PUT /users/:id
//@access Private

// const updateUserProfile = expressAsyncHandler(async(req, res) => {
//     const { email, userName, phone, password } = req?.body;
    
//     const oldUserDetails = req.user;
//     const userId = {_id:oldUserDetails._id};
//     const updateBody = { email, userName, phone}
//     const user = await User.findOne({email})

//     if(user && (await user.matchPasswords(password))){
//         const updatedUser = await User.findOneAndUpdate(userId, updateBody,{
//             new:true,
//             fields:{ password: 0},
//         });
        
//         res.status(200).json({
//             message:"Updated successfully",
//             updatedUser
//         })
//     } else {
//         res.status(403).json({
//             message:'wrong Credentials',
//         })
//     }
// })

const updateUser = expressAsyncHandler(async(req, res) => {
    const { email, userName, phone } = req?.body;
    
    const userId = req.params.userId
    const updateBody = { email, userName, phone}
    
    try {
        const updateuser = await User.findByIdAndUpdate(userId, updateBody, {new : true})
        res.json(updateuser)
    } catch (error) {
        res.json(error)
    }

    
})

//@desc Delete User
//@route DELETE /users/:id
//@access Private/Admin

const deleteUser = expressAsyncHandler(async(req, res) => {

    try {
          await User.findByIdAndDelete(req.params.id);
        
            res.status(200).json('User Deleted')

    } catch (error) {
        res.status(404);
        throw new Error('User not found')
    }
})

//@desc Get User List
//@route GET /users
//@access Private/Admin

const fetchUsers = expressAsyncHandler(async (req, res) => {
    const query = req.query.new
    try {
      const users = query ? 
      await User.find().sort({_id:-1}).limit(5) :
      await User.find({}, {password:0});
      res.json(users);
    } catch (error) {
      res.json(error);
    }
  });

module.exports ={register, loginHandler, getUserProfile, deleteUser, fetchUsers, updateUser}