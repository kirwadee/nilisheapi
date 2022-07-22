const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
      userName: {
        type:String,
        required:true,
      },
      email: {
         type: String,
         required: [true, "Email is required"],
         unique: true,
        },
      password: {
          type: String,
          required:[true, "Please provide password"],
          minlength:6,
      
         },
      phone: {
        type:String,
        required:[true, "Please provide phone number"],
      },
      role: {
        type: String,
        required: true,
        default:"customer"
      }
    },
    { timestamps: true }
  );


//Hash password middleware
UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//Verify password method which compare entered password and password in db
UserSchema.methods.matchPasswords = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}



module.exports = mongoose.model("User", UserSchema)